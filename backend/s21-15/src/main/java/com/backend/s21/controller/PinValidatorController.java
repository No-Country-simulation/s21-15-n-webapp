package com.backend.s21.controller;

import com.backend.s21.model.users.User;
import com.backend.s21.repository.IUserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/locked")
public class PinValidatorController {

    public final IUserRepository userRepository;

    public PinValidatorController(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/{id}")
    public ResponseEntity<String> unlockScreen(@RequestBody String pin, @PathVariable int id) {
        try {
            String userPin = userRepository.findById(id).get().getPin();
            //Metodo que compara PIN ingresado con PIN en BD.
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("El PIN es incorrecto.");
        }
        return null; //implementación de llamado a metodo que verificará el PIN.
    }
}
