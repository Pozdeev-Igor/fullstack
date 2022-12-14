package com.example.petproject.repos;

import com.example.petproject.domain.Comment;
import com.example.petproject.domain.CommentsAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface CommentRepo extends JpaRepository<Comment, Long> {
    @Query("select c from Comment c "
            + " where c.advert.id = :advertId")
    Set<Comment> findByAdvertId(Long advertId);

    @Query("select a from CommentsAnswer a where a.comment.id = :commentId")
    Set<CommentsAnswer> findAnswersByCommentId(Long commentId);
}
