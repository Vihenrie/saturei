package com.saturei.backend.chat.infrastructure.web;

import com.saturei.backend.chat.application.ChatService;
import com.saturei.backend.chat.application.dto.ConversationResponse;
import com.saturei.backend.chat.application.dto.MessageResponse;
import com.saturei.backend.chat.application.dto.SendMessageRequest;
import com.saturei.backend.chat.application.dto.StartConversationRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/chats")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/conversations")
    public ResponseEntity<ConversationResponse> startConversation(@Valid @RequestBody StartConversationRequest request) {
        // TODO: replace hardcoded UUID with authenticated user from SecurityContext
        UUID userId = UUID.randomUUID();
        return ResponseEntity.status(HttpStatus.CREATED).body(chatService.startConversation(request, userId));
    }

    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationResponse>> listConversations() {
        // TODO: replace hardcoded UUID with authenticated user from SecurityContext
        UUID userId = UUID.randomUUID();
        return ResponseEntity.ok(chatService.listConversations(userId));
    }

    @PostMapping("/messages")
    public ResponseEntity<MessageResponse> sendMessage(@Valid @RequestBody SendMessageRequest request) {
        // TODO: replace hardcoded UUID with authenticated user from SecurityContext
        UUID userId = UUID.randomUUID();
        return ResponseEntity.status(HttpStatus.CREATED).body(chatService.sendMessage(request, userId));
    }

    @GetMapping("/conversations/{conversationId}/messages")
    public ResponseEntity<List<MessageResponse>> getMessages(@PathVariable UUID conversationId) {
        // TODO: replace hardcoded UUID with authenticated user from SecurityContext
        UUID userId = UUID.randomUUID();
        return ResponseEntity.ok(chatService.getMessages(conversationId, userId));
    }
}
