package com.saturei.backend.order.application.dto;

import com.saturei.backend.order.domain.vo.PaymentMethod;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

public record CreateOrderRequest(
        @NotEmpty List<UUID> listingIds,
        @NotNull PaymentMethod paymentMethod,
        String shippingAddress
) {}
