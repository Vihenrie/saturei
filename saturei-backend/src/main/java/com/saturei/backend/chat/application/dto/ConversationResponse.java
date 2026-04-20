package com.saturei.backend.chat.application.dto;

import com.saturei.backend.chat.domain.Conversation;

import java.time.LocalDateTime;
import java.util.UUID;

public record ConversationResponse(
        UUID id,
        UUID buyerId,
        UUID sellerId,
        UUID listingId,
        String listingTitle,
        LocalDateTime createdAt
) {
    public static ConversationResponse from(Conversation conversation) {
        return new ConversationResponse(
                conversation.getId(),
                conversation.getBuyer().getId(),
                conversation.getSeller().getId(),
                conversation.getListing().getId(),
                conversation.getListing().getTitle(),
                conversation.getCreatedAt()
        );
    }
}
