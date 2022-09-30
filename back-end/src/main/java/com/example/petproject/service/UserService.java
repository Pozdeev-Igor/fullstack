package com.example.petproject.service;

import com.example.petproject.DTO.RegistrationUserDTO;
import com.example.petproject.domain.Authority;
import com.example.petproject.domain.User;
import com.example.petproject.repos.AuthorityRepo;
import com.example.petproject.repos.UserRepo;
import com.example.petproject.utils.CustomPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthorityRepo authorityRepo;
    @Autowired
    private CustomMailSender mailSender;
    @Autowired
    private CustomPasswordEncoder passwordEncoder;

    public Optional<User> findUserByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public User save(User user, RegistrationUserDTO registrationUserDTO) {
//        user = new User();
        user.setName(registrationUserDTO.getName());
        user.setUsername(registrationUserDTO.getUsername());
        user.setEmail(registrationUserDTO.getEmail());
        user.setPassword(passwordEncoder.getPasswordEncoder().encode(registrationUserDTO.getPassword()));
        user.setActivationCode(UUID.randomUUID().toString());
        user.setCohortStartDate(LocalDate.now());

        userRepo.save(user);

        Authority authority = new Authority();
        authority.setAuthority("ROLE_USER");
        authority.setUser(user);
        authorityRepo.save(authority);

        sendMessage(user);

        return user;
    }

    private void sendMessage(User user) {
        if (!StringUtils.isEmpty(user.getEmail())) {
            String message = String.format(
                    "Hello, %s! \n" +
                            "Welcome to ADVERTS. Please, visit next link: http://localhost:3000/activate/%s",
                    user.getUsername(),
                    user.getActivationCode()
            );

            mailSender.send(user.getEmail(), "Activation code", message);
        }
    }

    public User findUserById(Long userId) {
        return userRepo.getReferenceById(userId);
    }
}

