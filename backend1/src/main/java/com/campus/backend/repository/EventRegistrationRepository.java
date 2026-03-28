package com.campus.backend.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.campus.backend.model.EventRegistration;

public interface EventRegistrationRepository
        extends MongoRepository<EventRegistration, String> {

    // --------------------------------------
    // ✅ BOOLEAN BASED (USED BY ADMIN)
    // --------------------------------------

    // Active events
    List<EventRegistration> findByExpiredFalse();

    // Expired events
    List<EventRegistration> findByExpiredTrue();

    // User expired history
    List<EventRegistration> findByUserIdAndExpiredTrue(String userId);


    // --------------------------------------
    // ✅ DATE BASED (REAL-TIME CORRECT DATA)
    // --------------------------------------

    // Active events (based on date)
    List<EventRegistration> findByExpireAtAfter(Date date);

    // Expired events (based on date)
    List<EventRegistration> findByExpireAtBefore(Date date);

    // User history (date-based)
    List<EventRegistration> findByUserIdAndExpireAtBefore(String userId, Date date);


    // --------------------------------------
    // ✅ AUTO DELETE (OPTIONAL)
    // --------------------------------------

    void deleteByExpireAtBefore(Date date);
}
