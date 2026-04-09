package com.saturei.backend.listing.application.dto;

import com.saturei.backend.listing.domain.vo.ConservationState;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public record CreateListingRequest(
        @NotBlank String title,
        String description,
        @NotNull @Positive BigDecimal price,
        @NotNull ConservationState conservationState,
        String category,
        String location
) {}
