package com.example.petproject.repos;

import com.example.petproject.domain.CommentsAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface CommentsAnswerRepo extends JpaRepository<CommentsAnswer, Long> {

    @Query("select a from CommentsAnswer a where a.comment.id = :commentId")
    Set<CommentsAnswer> findByCommentId(Long commentId);
    @Query("select a from CommentsAnswer a where a.text like :usersName%")
    Set<CommentsAnswer> findAnswersByusersName(String usersName);
}
