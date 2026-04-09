package com.saturei.backend.order.application.dto;

import com.saturei.backend.order.domain.Order;
import com.saturei.backend.order.domain.OrderItem;
import com.saturei.backend.order.domain.vo.OrderStatus;
import com.saturei.backend.order.domain.vo.PaymentMethod;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record OrderResponse(
        UUID id,
        UUID buyerId,
        List<OrderItemResponse> items,
        OrderStatus status,
        PaymentMethod paymentMethod,
        BigDecimal total,
        String shippingAddress,
        LocalDateTime createdAt
) {
    public record OrderItemResponse(UUID listingId, String listingTitle, BigDecimal priceAtPurchase) {
        public static OrderItemResponse from(OrderItem item) {
            return new OrderItemResponse(
                    item.getListing().getId(),
                    item.getListing().getTitle(),
                    item.getPriceAtPurchase()
            );
        }
    }

    public static OrderResponse from(Order order) {
        return new OrderResponse(
                order.getId(),
                order.getBuyer().getId(),
                order.getItems().stream().map(OrderItemResponse::from).toList(),
                order.getStatus(),
                order.getPaymentMethod(),
                order.getTotal(),
                order.getShippingAddress(),
                order.getCreatedAt()
        );
    }
}
