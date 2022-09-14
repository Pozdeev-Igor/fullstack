package com.example.petproject.repos;

import com.example.petproject.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface CommentRepo extends JpaRepository<Comment, Long> {
    @Query("select c from Comment c "
            + " where c.advert.id = :assignmentId")
    Set<Comment> findByAssignmentId(Long assignmentId);
}
