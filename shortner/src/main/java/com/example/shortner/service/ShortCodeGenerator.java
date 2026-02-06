package com.example.shortner.service;

import java.security.SecureRandom;

import org.springframework.stereotype.Component;

@Component
public class ShortCodeGenerator {

    private static final String BASE62="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private final SecureRandom random = new SecureRandom();

    public String generate(int length){
        StringBuilder sb= new StringBuilder(length);

        for(int i=0; i<length; i++){
            int index= random.nextInt(BASE62.length());
            sb.append(BASE62.charAt(index));
        }

        return sb.toString();
    }
}
