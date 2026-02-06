package com.example.shortner.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ShortUrlNotFoundException.class)
    public ResponseEntity<?> handleShortUrlNotFound(ShortUrlNotFoundException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(UniqueShortCodeExhaustedExcpetion.class)
    public ResponseEntity<?> handleShortCodeExhausted(UniqueShortCodeExhaustedExcpetion ex){
        return ResponseEntity
            .status(HttpStatus.SERVICE_UNAVAILABLE)
            .body(ex.getMessage());
    }
}
