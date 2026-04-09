package com.saturei.backend.order.application;

import com.saturei.backend.order.domain.Order;

public interface PaymentGatewayPort {

    /**
     * Initiates a payment for the given order.
     * Returns a redirect URL or payment intent ID depending on the gateway.
     */
    String initiatePayment(Order order);

    /**
     * Handles a webhook/callback from the payment gateway to confirm payment.
     */
    void handleWebhook(String payload, String signature);
}
