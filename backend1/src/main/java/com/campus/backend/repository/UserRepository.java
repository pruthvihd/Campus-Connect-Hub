package com.campus.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.campus.backend.model.User;

public interface UserRepository extends MongoRepository<User, String> {

    User findByEmail(String email);
}
