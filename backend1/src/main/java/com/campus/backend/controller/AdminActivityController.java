package com.campus.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campus.backend.model.AdminActivity;
import com.campus.backend.repository.AdminActivityRepository;

@RestController
@RequestMapping("/admin/activity")
@CrossOrigin("*")
public class AdminActivityController {

    @Autowired
    private AdminActivityRepository repo;

    // ✅ GET ALL ADMIN ACTIVITIES (LOGS)
    @GetMapping("/all")
    public List<AdminActivity> getAllActivities() {
        return repo.findAll();
    }
}
