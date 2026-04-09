package com.saturei.backend.chat.application;

import com.saturei.backend.chat.domain.ConversationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ConversationRepository conversationRepository;

    // TODO: implement startConversation, sendMessage, getMessages, listConversations
}
