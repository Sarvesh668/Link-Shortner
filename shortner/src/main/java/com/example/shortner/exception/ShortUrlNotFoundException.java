package com.example.shortner.exception;

public class ShortUrlNotFoundException extends RuntimeException{

    public ShortUrlNotFoundException(String message){
        super(message);
    }
}
