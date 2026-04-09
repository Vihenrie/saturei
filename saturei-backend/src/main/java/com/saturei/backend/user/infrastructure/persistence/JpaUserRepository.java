package com.saturei.backend.user.infrastructure.persistence;

import com.saturei.backend.user.domain.User;
import com.saturei.backend.user.domain.UserRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface JpaUserRepository extends UserRepository, JpaRepository<User, UUID> {}
