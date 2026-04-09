package com.saturei.backend.order.infrastructure.persistence;

import com.saturei.backend.order.domain.Order;
import com.saturei.backend.order.domain.OrderRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface JpaOrderRepository extends OrderRepository, JpaRepository<Order, UUID> {}
