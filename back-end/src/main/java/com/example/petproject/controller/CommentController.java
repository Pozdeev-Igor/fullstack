package com.example.petproject.controller;

import com.example.petproject.DTO.CommentDTO;
import com.example.petproject.DTO.CommentsAnswerDTO;
import com.example.petproject.domain.Comment;
import com.example.petproject.domain.CommentsAnswer;
import com.example.petproject.domain.User;
import com.example.petproject.service.CommentService;
import com.example.petproject.service.CommentsAnswerService;
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
    @Autowired
    private CommentsAnswerService answerService;

    @PostMapping("")
    public ResponseEntity<Comment> createComment(@RequestBody CommentDTO commentDTO, @AuthenticationPrincipal User user) {
        Comment comment = commentService.save(commentDTO, user);
        return ResponseEntity.ok(comment);
    }


    @PostMapping("/answer")
    public ResponseEntity<CommentsAnswer> createAnswer(@RequestBody CommentsAnswerDTO answerDTO, @AuthenticationPrincipal User user) {
        CommentsAnswer answer = answerService.save(answerDTO, user);
        return ResponseEntity.ok(answer);
    }

    @PutMapping("{commentId}")
    public ResponseEntity<Comment> updateComment (@RequestBody CommentDTO commentDTO, @AuthenticationPrincipal User user) {
        Comment comment = commentService.save(commentDTO, user);

        return ResponseEntity.ok(comment);
    }

    @PutMapping("answer/{answerId}")
    public ResponseEntity<CommentsAnswer> updateAnswer (@RequestBody CommentsAnswerDTO answerDTO, @AuthenticationPrincipal User user) {
        CommentsAnswer answer = answerService.save(answerDTO, user);

        return ResponseEntity.ok(answer);
    }

    @GetMapping("")
    public ResponseEntity<Set<Comment>> getCommentsByAdvert(@RequestParam Long advertId) {
        Set<Comment> comments = commentService.getCommentsByAdvertId(advertId);

        return ResponseEntity.ok(comments);
    }


    @GetMapping("/answer")
    public ResponseEntity<Set<CommentsAnswer>> getAnswersByCommentId(@RequestParam Long commentId) {
        Set<CommentsAnswer> answers = answerService.getAnswerByCommentId(commentId);

        return ResponseEntity.ok(answers);
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
