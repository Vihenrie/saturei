package com.saturei.backend.chat.infrastructure.persistence;

import com.saturei.backend.chat.domain.Conversation;
import com.saturei.backend.chat.domain.ConversationRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface JpaConversationRepository extends ConversationRepository, JpaRepository<Conversation, UUID> {}
