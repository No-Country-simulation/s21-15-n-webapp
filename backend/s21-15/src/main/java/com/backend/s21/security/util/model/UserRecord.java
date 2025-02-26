package com.backend.s21.security.util.model;

import java.io.Serializable;
import java.util.Set;

public record UserRecord(String username,
                         String email,
                         String firstName,
                         String lastName,
                         String password,
                         Set<String> roles) implements Serializable {
}
