package com.nimbus.controllers;

import com.nimbus.dtos.AuthenticationRequest;
import com.nimbus.dtos.AuthenticationResponse;
import com.nimbus.dtos.SignupRequest;
import com.nimbus.dtos.UserDto;
import com.nimbus.entities.User;
import com.nimbus.repositories.UserRepository;
import com.nimbus.services.auth.AuthService;
import com.nimbus.services.jwt.UserService;
import com.nimbus.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> createCustomer(@RequestBody SignupRequest signupRequest){
        if (authService.hasCustomerWithEmail(signupRequest.getEmail()))
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Email already exists. Try again with another email");
        UserDto createdUserDto = authService.createCustomer(signupRequest);
        if (createdUserDto == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad Request");
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUserDto);
    }

    @PostMapping("/login")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws
            BadCredentialsException,
            DisabledException,
            UsernameNotFoundException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect Username or Password");
        }
        final UserDetails userDetails = userService.userDetailsService().loadUserByUsername(authenticationRequest.getEmail());
        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();
        if (optionalUser.isPresent()) {
            authenticationResponse.setJwt(jwt);
            authenticationResponse.setUserId(optionalUser.get().getId());
            authenticationResponse.setUserRole(optionalUser.get().getUserRole());
        }
        return authenticationResponse;
    }
}
