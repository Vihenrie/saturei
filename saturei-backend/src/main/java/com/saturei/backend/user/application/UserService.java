package com.saturei.backend.user.application;

import com.saturei.backend.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    // TODO: implement register, login, getProfile
}
