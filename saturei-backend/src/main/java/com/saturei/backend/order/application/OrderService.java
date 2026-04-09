package com.saturei.backend.order.application;

import com.saturei.backend.order.domain.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    // TODO: implement create, getById, listByBuyer, cancel
}
