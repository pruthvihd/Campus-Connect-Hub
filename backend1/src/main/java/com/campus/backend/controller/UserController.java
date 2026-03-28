package com.campus.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campus.backend.model.User;
import com.campus.backend.repository.UserRepository;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository repo;

    // ✅ REGISTER USER
    @PostMapping("/register")
    public User registerUser(@RequestBody User user){

        User existingUser = repo.findByEmail(user.getEmail());

        if(existingUser != null){
            throw new RuntimeException("Email already registered!");
        }

        return repo.save(user);
    }

    // ✅ GET ALL USERS (for testing)
    @GetMapping("/all")
    public java.util.List<User> getUsers(){
        return repo.findAll();
    }
}
