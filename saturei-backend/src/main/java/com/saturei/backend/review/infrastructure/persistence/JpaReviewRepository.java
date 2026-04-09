package com.saturei.backend.review.infrastructure.persistence;

import com.saturei.backend.review.domain.Review;
import com.saturei.backend.review.domain.ReviewRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface JpaReviewRepository extends ReviewRepository, JpaRepository<Review, UUID> {}
