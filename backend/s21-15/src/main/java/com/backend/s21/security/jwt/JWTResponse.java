package com.backend.s21.security.jwt;

public record JWTResponse(String refresh_token,
                          String expires_in,
                          String access_token,
                          String token_type,
                          String scope,
                          String session_state) {
}
