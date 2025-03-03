package com.backend.s21.controller;

import com.backend.s21.security.jwt.JWTRequest;
import com.backend.s21.security.jwt.JWTResponse;
import com.backend.s21.security.service.IKeyCloakService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/keycloak")
@Tag(name = "Autenticación", description = "Operaciones relacionadas con la autenticación de usuarios")
public class LoginController {

    private final IKeyCloakService iKeyCloakService;

    public LoginController(IKeyCloakService iKeyCloakService) {
        this.iKeyCloakService = iKeyCloakService;
    }

    @PostMapping("/login")
    @PreAuthorize("permitAll()")
    @Operation(summary = "Iniciar sesión", description = "Autentica un usuario y devuelve un token JWT.")
    @ApiResponse(responseCode = "200", description = "Autenticación exitosa", content = @Content(mediaType = "application/json", schema = @Schema(implementation = JWTResponse.class)))
    @ApiResponse(responseCode = "401", description = "Credenciales inválidas", content = @Content(mediaType = "text/plain"))
    public ResponseEntity<?> login(@RequestBody JWTRequest request) throws Exception {
        try {
            String name = request.username().toLowerCase();
            String password = request.password();
            JWTResponse jwtResponse = iKeyCloakService.login(name, password);
            return ResponseEntity.ok(jwtResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

}
