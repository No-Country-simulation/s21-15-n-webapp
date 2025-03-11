package com.backend.s21.controller;

import com.backend.s21.repository.IUserRepository;
import com.backend.s21.security.SecurityContextValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/locked")
public class PinValidatorController {

    public final IUserRepository userRepository;
    private final SecurityContextValidator validator;

    public PinValidatorController(IUserRepository userRepository, SecurityContextValidator validator) {
        this.userRepository = userRepository;
        this.validator = validator;
    }

    @PostMapping("/{pin}")
    public ResponseEntity<String> unlockScreen(@PathVariable String pin) {
        try {
            String userPin = userRepository
                    .findByNickname(validator.userContext()).get().getPin();
            if (!userPin.equalsIgnoreCase(pin)) {
                return ResponseEntity.badRequest().body("The Pin is incorrect.");
            }else {
                return ResponseEntity.ok("The Pin is correct.");
            }
        } catch (Exception e) {
            return ResponseEntity.ok("Please contact with the admins.");
        }
    }
}
