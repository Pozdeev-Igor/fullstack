package com.example.petproject.controller;

import com.example.petproject.DTO.AuthCredentialsRequest;
import com.example.petproject.DTO.RegistrationUserDTO;
import com.example.petproject.domain.User;
import com.example.petproject.repos.UserRepo;
import com.example.petproject.service.UserService;
import com.example.petproject.utils.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepo userRepo;

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody AuthCredentialsRequest request) {
        try {
            Authentication authenticate = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    request.getUsername(), request.getPassword()
                            )
                    );

            User user = (User) authenticate.getPrincipal();

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.AUTHORIZATION,
                            jwtUtil.generateToken(user)
                    )
                    .body(user);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestParam String token, @AuthenticationPrincipal User user) {
        if (token.equals("") || token == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            try {
                Boolean isValidToken = jwtUtil.validateToken(token, user);
                return ResponseEntity.ok(isValidToken);
            } catch (ExpiredJwtException exception) {
                return ResponseEntity.ok(false);
            }
        }
    }

    @PostMapping("/registration")
    public ResponseEntity<?> registration(@RequestBody RegistrationUserDTO registrationUserDTO) {

        if (userRepo.existsByUsername(registrationUserDTO.getUsername())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (userRepo.existsByEmail(registrationUserDTO.getEmail())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        User user = new User();

        if (!registrationUserDTO.getPassword().equals(registrationUserDTO.getConfirmPassword())) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
        }
//        if (user.getPassword() != null && !user.getPassword().equals(registrationUserDTO.getConfirmPassword())) {
//            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
//        }
        userService.save(user, registrationUserDTO);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
