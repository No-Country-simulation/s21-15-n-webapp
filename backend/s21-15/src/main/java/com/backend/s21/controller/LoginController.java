package com.backend.s21.controller;

import com.backend.s21.security.jwt.JWTRequest;
import com.backend.s21.security.jwt.JWTResponse;
import com.backend.s21.security.service.IKeyCloakService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/keycloak")
public class LoginController {

    private final IKeyCloakService iKeyCloakService;

    public LoginController(IKeyCloakService iKeyCloakService) {
        this.iKeyCloakService = iKeyCloakService;
    }

    @PostMapping("/login")
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> login(@RequestBody JWTRequest request) throws Exception {
        try {
            String name = request.username();
            String password = request.password();
            JWTResponse jwtResponse = iKeyCloakService.login(name, password);
            return ResponseEntity.ok(jwtResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

}
