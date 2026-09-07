package com.campus.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campus.backend.model.User;
import com.campus.backend.repository.UserRepository;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository repo;

    // ✅ REGISTER USER
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        User existingUser = repo.findByEmail(user.getEmail());

        if (existingUser != null) {
            return ResponseEntity
                    .badRequest()
                    .body("Email already registered!");
        }

        User savedUser = repo.save(user);
        return ResponseEntity.ok(savedUser);
    }

    // ✅ GET ALL USERS (for testing)
    @GetMapping("/all")
    public List<User> getUsers() {
        return repo.findAll();
    }
}
