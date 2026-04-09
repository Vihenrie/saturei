package com.saturei.backend.chat.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record SendMessageRequest(
        @NotNull UUID conversationId,
        @NotBlank String content
) {}
