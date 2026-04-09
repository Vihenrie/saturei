package com.saturei.backend.order.infrastructure.web;

import com.saturei.backend.order.application.OrderService;
import com.saturei.backend.order.application.dto.CreateOrderRequest;
import com.saturei.backend.order.application.dto.OrderResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<Page<OrderResponse>> list(Pageable pageable) {
        // TODO: replace hardcoded UUID with authenticated user from SecurityContext
        UUID buyerId = UUID.randomUUID();
        return ResponseEntity.ok(orderService.listByBuyer(buyerId, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getById(@PathVariable UUID id) {
        UUID buyerId = UUID.randomUUID();
        return ResponseEntity.ok(orderService.getById(id, buyerId));
    }

    @PostMapping
    public ResponseEntity<OrderResponse> create(@Valid @RequestBody CreateOrderRequest request) {
        UUID buyerId = UUID.randomUUID();
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.create(request, buyerId));
    }

    @PatchMapping("/{id}/cancel")
    public ResponseEntity<OrderResponse> cancel(@PathVariable UUID id) {
        UUID buyerId = UUID.randomUUID();
        return ResponseEntity.ok(orderService.cancel(id, buyerId));
    }

    @PostMapping("/webhook")
    public ResponseEntity<Void> webhook(@RequestBody String payload,
                                        @RequestHeader("X-Signature") String signature) {
        // TODO: inject PaymentGatewayPort and call handleWebhook
        return ResponseEntity.ok().build();
    }
}
