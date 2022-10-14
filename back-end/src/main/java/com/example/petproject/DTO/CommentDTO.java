package com.example.petproject.DTO;

import java.time.ZonedDateTime;

public class CommentDTO {

    private Long id;
    private Long advertId;
    private String text;
    private String user;
    private ZonedDateTime createdDate;

    public Long getAdvertId() {
        return advertId;
    }

    public void setAdvertId(Long advertId) {
        this.advertId = advertId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    @Override
    public String toString() {
        return "CommentDTO{" +
                "id=" + id +
                ", advertId=" + advertId +
                ", text='" + text + '\'' +
                ", user='" + user + '\'' +
                ", createdDate=" + createdDate +
                '}';
    }
}
