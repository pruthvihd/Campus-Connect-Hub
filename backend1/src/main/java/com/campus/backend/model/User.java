package com.campus.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String name;
    private String email;
    private String password;
    private String phone;
    private String college;
    private String branch;
    private String role;
    private String year;
    private String experience;

    // ===== GETTERS =====

    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getPhone() { return phone; }
    public String getCollege() { return college; }
    public String getBranch() { return branch; }
    public String getRole() { return role; }
    public String getYear() { return year; }
    public String getExperience() { return experience; }

    // ===== SETTERS =====

    public void setId(String id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setCollege(String college) { this.college = college; }
    public void setBranch(String branch) { this.branch = branch; }
    public void setRole(String role) { this.role = role; }
    public void setYear(String year) { this.year = year; }
    public void setExperience(String experience) { this.experience = experience; }
}
