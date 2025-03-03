package com.backend.s21.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;

@RestControllerAdvice
public class ControlGlobalException{

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<MessageException> handleDuplicateKeyException(DataIntegrityViolationException ex, WebRequest request) {
        MessageException messageShow = new MessageException(
                LocalDateTime.now(),
                "Error: Register duplicated in the database, " + ex.getMessage(),
                request.getContextPath()
        );
        return new ResponseEntity<>(messageShow, HttpStatus.CONFLICT); // 409 Conflict
    }

    @ExceptionHandler(NoSuchMethodException.class)
    public ResponseEntity<MessageException> handleExceptionNotMethod(Exception ex, WebRequest path) {

        MessageException messageShow =
                new MessageException(LocalDateTime.now(), ex.getMessage(), path.getContextPath());
        return new ResponseEntity<>(messageShow,
                HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler(ModelNotFoundException.class)
    public ResponseEntity<MessageException> handleExceptionNotFound(Exception ex, WebRequest path) {

        MessageException messageShow =
                new MessageException(LocalDateTime.now(), ex.getMessage(),path.getContextPath());
        return new ResponseEntity<>(messageShow,
                HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<MessageException> handleException(Exception ex, WebRequest path) {

        MessageException messageShow =
                new MessageException(LocalDateTime.now(), ex.getMessage(), path.getContextPath());
        return new ResponseEntity<>(messageShow,
                HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
