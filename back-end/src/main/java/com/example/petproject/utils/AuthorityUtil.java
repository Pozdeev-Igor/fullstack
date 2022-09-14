package com.example.petproject.utils;

import com.example.petproject.domain.User;
import org.springframework.stereotype.Component;

@Component
public class AuthorityUtil {
    public static Boolean hasRole(String role, User user) {
        return user.getAuthorities()
                   .stream()
                   .filter(auth -> auth.getAuthority().equals(role))
                   .count() > 0;
    }
}
