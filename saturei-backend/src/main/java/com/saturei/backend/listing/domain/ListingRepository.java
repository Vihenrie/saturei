package com.saturei.backend.listing.domain;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.UUID;

public interface ListingRepository extends JpaRepository<Listing, UUID> {

    Page<Listing> findBySellerId(UUID sellerId, Pageable pageable);

    @Query("""
            SELECT l FROM Listing l
            WHERE l.status = 'ACTIVE'
            AND (:keyword IS NULL OR LOWER(l.title) LIKE LOWER(CONCAT('%', :keyword, '%')))
            AND (:category IS NULL OR l.category = :category)
            AND (:location IS NULL OR l.location = :location)
            AND (:minPrice IS NULL OR l.price >= :minPrice)
            AND (:maxPrice IS NULL OR l.price <= :maxPrice)
            """)
    Page<Listing> search(
            @Param("keyword") String keyword,
            @Param("category") String category,
            @Param("location") String location,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            Pageable pageable
    );
}
