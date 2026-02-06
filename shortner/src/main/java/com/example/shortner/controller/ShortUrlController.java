package com.example.shortner.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.shortner.model.ShortUrl;
import com.example.shortner.service.ShortUrlService;

@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("/api")
public class ShortUrlController {

    private final ShortUrlService shortUrlService;

    public ShortUrlController(ShortUrlService shortUrlService){
        this.shortUrlService=shortUrlService;
    }

    @PostMapping("/shorten")
    public ResponseEntity<?> createShortUrl(@RequestBody CreateShortUrlRequest request){
        ShortUrl shortUrl= shortUrlService.createShortUrl(request.getUrl());

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new CreateShortUrlResponse(shortUrl.getShortCode()));
    }
}
