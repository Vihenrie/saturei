package com.saturei.backend.listing.infrastructure.persistence;

import com.saturei.backend.listing.domain.Listing;
import com.saturei.backend.listing.domain.ListingRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface JpaListingRepository extends ListingRepository, JpaRepository<Listing, UUID> {}
