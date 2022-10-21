package com.example.petproject.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
//    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "advert_id")
    private Advert advert;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User createdBy;
    private ZonedDateTime createdDate;
    @Column(length = 5000)
    private String text;
    @Transient
    @JsonIgnore
    private Set<CommentsAnswer> answers;


    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Advert getAdvert() {
        return advert;
    }

    public void setAdvert(Advert advert) {
        this.advert = advert;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<CommentsAnswer> getAnswers() {
        return answers;
    }

    public void setAnswers(Set<CommentsAnswer> answers) {
        this.answers = answers;
    }
}
