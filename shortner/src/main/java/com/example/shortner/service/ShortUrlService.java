package com.example.shortner.service;

import org.springframework.stereotype.Service;

import com.example.shortner.exception.UniqueShortCodeExhaustedExcpetion;
import com.example.shortner.model.ShortUrl;
import com.example.shortner.repository.ShortUrlRepository;
import org.springframework.dao.DataIntegrityViolationException;


@Service
public class ShortUrlService {

    private final ShortCodeGenerator shortCodeGenerator;
    private final ShortUrlRepository shortUrlRepository;
    private static final int MAX_RETRIES=10;
    private static final int SHORT_CODE_LENGTH=7;

    //Injection is done
    public ShortUrlService(ShortUrlRepository shortUrlRepository, ShortCodeGenerator shortCodeGenerator){
        this.shortUrlRepository=shortUrlRepository;
        this.shortCodeGenerator=shortCodeGenerator;
    }

    public ShortUrl createShortUrl(String originalUrl){
        for(int attempt=0; attempt<MAX_RETRIES; attempt++){
            String shortCode = shortCodeGenerator.generate(SHORT_CODE_LENGTH);

            ShortUrl shortUrl= new ShortUrl(originalUrl);
            shortUrl.setShortCode(shortCode);

            try{
                return shortUrlRepository.save(shortUrl);
            }
            catch(DataIntegrityViolationException ex){
                
            }
        }
        throw new UniqueShortCodeExhaustedExcpetion("Failed to generate unique short code "+MAX_RETRIES+" attemps");
    }

   /*  public String createShortUrl(String originalUrl){



        throw new UnsupportedOperationException("Not implmented yet");
    }*/
}
