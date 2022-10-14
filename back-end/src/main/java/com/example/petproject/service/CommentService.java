package com.example.petproject.service;

import com.example.petproject.DTO.CommentDTO;
import com.example.petproject.domain.Advert;
import com.example.petproject.domain.Comment;
import com.example.petproject.domain.User;
import com.example.petproject.repos.AdvertRepo;
import com.example.petproject.repos.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.Optional;
import java.util.Set;

@Service
public class CommentService {

    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private AdvertRepo advertRepo;

    public Comment save(CommentDTO commentDTO, User user) {

        Comment comment = new Comment();
        Advert advert = advertRepo.findById(commentDTO.getAdvertId()).get();
        comment.setId(commentDTO.getId());
        comment.setText(commentDTO.getText());
        comment.setCreatedBy(user);
        comment.setAdvert(advert);
        if (comment.getId() == null)
            comment.setCreatedDate(ZonedDateTime.now());
        else
            comment.setCreatedDate(commentDTO.getCreatedDate());

        return commentRepo.save(comment);
    }

    public Set<Comment> getCommentsByAssignmentId(Long advertId) {
        Set<Comment> comments = commentRepo.findByAdvertId(advertId);

        return comments;
    }

    public void delete(Long commentId) {
        commentRepo.deleteById(commentId);
    }
}
