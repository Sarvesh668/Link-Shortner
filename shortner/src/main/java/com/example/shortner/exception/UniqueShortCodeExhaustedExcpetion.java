package com.example.shortner.exception;

public class UniqueShortCodeExhaustedExcpetion extends RuntimeException {

    public UniqueShortCodeExhaustedExcpetion(String message){
        super(message);
    }
}
