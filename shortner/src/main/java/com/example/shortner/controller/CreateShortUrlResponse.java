package com.example.shortner.controller;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CreateShortUrlResponse {

    @JsonProperty("shortCode")
    private final String shortCode;

    public CreateShortUrlResponse(String shortCode){
        this.shortCode=shortCode;
    }

    public String getShortCode(){
        return shortCode;
    }
}
