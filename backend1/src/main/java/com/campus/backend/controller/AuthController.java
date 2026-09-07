package com.campus.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campus.backend.model.User;
import com.campus.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;


    // ✅ REGISTER USER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        // Check if email already exists
        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser != null) {
            return ResponseEntity
                    .badRequest()
                    .body("Email already registered!");
        }

        userRepository.save(user);

        return ResponseEntity.ok(user);
    }



    // ✅ LOGIN USER
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {

        User existingUser =
                userRepository.findByEmail(loginUser.getEmail());

        if (existingUser == null) {
            return ResponseEntity
                    .badRequest()
                    .body("User not found");
        }

        if (!existingUser.getPassword()
                .equals(loginUser.getPassword())) {

            return ResponseEntity
                    .badRequest()
                    .body("Invalid password");
        }

        return ResponseEntity.ok(existingUser);
    }
}
