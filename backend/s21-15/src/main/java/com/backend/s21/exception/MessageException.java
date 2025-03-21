package com.backend.s21.exception;


import java.time.LocalDateTime;

public record MessageException(
        LocalDateTime time,
        String message,
        String path
) {
}
