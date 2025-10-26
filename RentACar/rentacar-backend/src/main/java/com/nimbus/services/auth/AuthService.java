package com.nimbus.services.auth;

import com.nimbus.dtos.SignupRequest;
import com.nimbus.dtos.UserDto;

public interface AuthService {

    UserDto createCustomer(SignupRequest signupRequest);
    boolean hasCustomerWithEmail(String email);
}
