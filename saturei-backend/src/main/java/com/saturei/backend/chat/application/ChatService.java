package com.saturei.backend.chat.application;

import com.saturei.backend.chat.application.dto.ConversationResponse;
import com.saturei.backend.chat.application.dto.MessageResponse;
import com.saturei.backend.chat.application.dto.SendMessageRequest;
import com.saturei.backend.chat.application.dto.StartConversationRequest;
import com.saturei.backend.chat.domain.Conversation;
import com.saturei.backend.chat.domain.Message;
import com.saturei.backend.chat.infrastructure.persistence.JpaConversationRepository;
import com.saturei.backend.listing.infrastructure.persistence.JpaListingRepository;
import com.saturei.backend.shared.exception.ApiException;
import com.saturei.backend.user.infrastructure.persistence.JpaUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final JpaConversationRepository conversationRepository;
    private final JpaUserRepository userRepository;
    private final JpaListingRepository listingRepository;

    @Transactional
    public ConversationResponse startConversation(StartConversationRequest request, UUID buyerId) {
        var buyer = userRepository.findById(buyerId)
                .orElseThrow(() -> ApiException.notFound("buyer not found"));

        var listing = listingRepository.findById(request.listingId())
                .orElseThrow(() -> ApiException.notFound("listing not found"));

        if (listing.getSeller().getId().equals(buyerId)) {
            throw ApiException.badRequest("You cannot start a conversation with yourself");
        }

        var existingConversation = conversationRepository
                .findByBuyerIdAndSellerIdAndListingId(buyerId, listing.getSeller().getId(), listing.getId());

        if (existingConversation.isPresent()) {
            return ConversationResponse.from(existingConversation.get());
        }

        var conversation = Conversation.builder()
                .buyer(buyer)
                .seller(listing.getSeller())
                .listing(listing)
                .build();

        var message = Message.builder()
                .conversation(conversation)
                .sender(buyer)
                .content(request.initialMessage())
                .build();

        conversation.getMessages().add(message);

        return ConversationResponse.from(conversationRepository.save(conversation));
    }

    @Transactional
    public MessageResponse sendMessage(SendMessageRequest request, UUID senderId) {
        var sender = userRepository.findById(senderId)
                .orElseThrow(() -> ApiException.notFound("user not found"));

        var conversation = conversationRepository.findById(request.conversationId())
                .orElseThrow(() -> ApiException.notFound("conversation not found"));

        boolean isBuyer = conversation.getBuyer().getId().equals(senderId);
        boolean isSeller = conversation.getSeller().getId().equals(senderId);

        if (!isBuyer && !isSeller) {
            throw ApiException.forbidden("you are not part of this conversation");
        }

        var message = Message.builder()
                .conversation(conversation)
                .sender(sender)
                .content(request.content())
                .build();

        conversation.getMessages().add(message);
        conversationRepository.save(conversation);

        return MessageResponse.from(message);
    }

    @Transactional(readOnly = true)
    public List<MessageResponse> getMessages(UUID conversationId, UUID userId) {
        var conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> ApiException.notFound("conversation not found"));

        if (!conversation.getBuyer().getId().equals(userId) && !conversation.getSeller().getId().equals(userId)) {
            throw ApiException.forbidden("you are not part of this conversation");
        }

        return conversation.getMessages().stream()
                .sorted(Comparator.comparing(Message::getSentAt))
                .map(MessageResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ConversationResponse> listConversations(UUID userId) {
        return conversationRepository.findAllByUserId(userId).stream()
                .map(ConversationResponse::from)
                .collect(Collectors.toList());
    }
}
