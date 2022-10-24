package com.example.petproject.service;

import com.example.petproject.DTO.CommentsAnswerDTO;
import com.example.petproject.domain.CommentsAnswer;
import com.example.petproject.domain.User;
import com.example.petproject.repos.CommentRepo;
import com.example.petproject.repos.CommentsAnswerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.Set;

@Service
public class CommentsAnswerService {

    @Autowired
    CommentsAnswerRepo answerRepo;
    @Autowired
    CommentRepo commentRepo;


    public CommentsAnswer save(CommentsAnswerDTO answerDTO, User user) {
        CommentsAnswer answer = new CommentsAnswer();
        answer.setId(answerDTO.getId());
        answer.setText(answerDTO.getText());
        answer.setCreatedBy(user);
        answer.setComment(commentRepo.findById(answerDTO.getCommentId()).get());
        if (answer.getId() == null) {
            answer.setCreatedDate(ZonedDateTime.now());
        }else {
            answer.setCreatedDate(answerDTO.getCreatedDate());
        }

        return answerRepo.save(answer);
    }

    public Set<CommentsAnswer> getAnswerByCommentId(Long commentId) {
        Set<CommentsAnswer> answerSet = answerRepo.findByCommentId(commentId);

        return answerSet;
    }
}
