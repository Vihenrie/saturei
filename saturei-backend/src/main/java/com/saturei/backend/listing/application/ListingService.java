package com.saturei.backend.listing.application;

import com.saturei.backend.listing.domain.ListingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ListingService {

    private final ListingRepository listingRepository;

    // TODO: implement create, update, updateStatus, delete, search, getById
}
