package com.example.shortner.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name="short_urls")
public class ShortUrl {

    @Id
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "url_sequence"
    )
    @SequenceGenerator(
        name="url_sequence",
        sequenceName = "url_sequence"
    )
    private Long id;
    private String originalUrl;

    @Column(unique= true)
    private String shortCode;
    private Long clickCount=0L;
    private LocalDateTime createdAt= LocalDateTime.now();

    protected ShortUrl(){}

    public ShortUrl(String originalUrl){
        this.originalUrl=originalUrl;
    }

    public Long getId(){
        return id;
    }
    public String getOriginalUrl(){
        return originalUrl;
    }
    public String getShortCode(){
        return shortCode;
    }
    public Long getClickCount(){
        return clickCount;
    }
    public LocalDateTime getCreationTime(){
        return createdAt;
    }

    public void incrementClickCount(){
        this.clickCount++;
    }

    public String getUrl(){
        return originalUrl;
    }

    public void setShortCode(String shortCode){
        this.shortCode=shortCode;
    }
}
