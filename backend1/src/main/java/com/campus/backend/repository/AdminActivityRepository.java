package com.campus.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.campus.backend.model.AdminActivity;

public interface AdminActivityRepository
        extends MongoRepository<AdminActivity, String> {

    // No custom methods needed for now
}
