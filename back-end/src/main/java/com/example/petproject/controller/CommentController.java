package com.example.petproject.controller;

import com.example.petproject.DTO.CommentDTO;
import com.example.petproject.domain.Comment;
import com.example.petproject.domain.User;
import com.example.petproject.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("")
    public ResponseEntity<Comment> createComment(@RequestBody CommentDTO commentDTO, @AuthenticationPrincipal User user) {
        Comment comment = commentService.save(commentDTO, user);
        return ResponseEntity.ok(comment);
    }

    @PutMapping("{commentId}")
    public ResponseEntity<Comment> updateComment (@RequestBody CommentDTO commentDTO, @AuthenticationPrincipal User user) {
        Comment comment = commentService.save(commentDTO, user);

        return ResponseEntity.ok(comment);
    }

    @GetMapping("")
    public ResponseEntity<Set<Comment>> getCommentsByAdvert(@RequestParam Long advertId) {
        Set<Comment> comments = commentService.getCommentsByAdvertId(advertId);

        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId) {

        try {
            commentService.delete(commentId);
                return ResponseEntity.ok(commentId);
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }
}
