package com.example.shortner.service;

import org.springframework.stereotype.Service;

import com.example.shortner.exception.ShortUrlNotFoundException;
import com.example.shortner.model.ShortUrl;
import com.example.shortner.repository.ShortUrlRepository;

import jakarta.transaction.Transactional;

@Service
public class RedirectService {

    private final ShortUrlRepository shortUrlRepository;

    public RedirectService(ShortUrlRepository shortUrlRepository){
        this.shortUrlRepository=shortUrlRepository;
    }

    @Transactional
    public String resolveOriginalUrl(String shortCode){

        ShortUrl shortUrl= shortUrlRepository.findByShortCode(shortCode).orElseThrow(()->
                new ShortUrlNotFoundException("Short URL found for the code: "+ shortCode));

            shortUrl.incrementClickCount();
            return shortUrl.getUrl();
     //   throw new UnsupportedOperationException("Not implemented yet");
    }
}
