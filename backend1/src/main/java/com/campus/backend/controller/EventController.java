package com.campus.backend.controller;

import java.time.*;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.campus.backend.model.AdminActivity;
import com.campus.backend.model.EventRegistration;
import com.campus.backend.repository.AdminActivityRepository;
import com.campus.backend.repository.EventRegistrationRepository;

@RestController
@RequestMapping("/events")
@CrossOrigin("*")
public class EventController {

    @Autowired
    private EventRegistrationRepository repo;

    @Autowired
    private AdminActivityRepository activityRepo;

    //--------------------------------------
    // ⭐ CONVERT TO IST END OF DAY
    //--------------------------------------

    private Date convertToISTEndOfDay(Date inputDate) {

        ZoneId indiaZone = ZoneId.of("Asia/Kolkata");

        LocalDate eventDate = inputDate
                .toInstant()
                .atZone(indiaZone)
                .toLocalDate();

        LocalDateTime endOfDay = eventDate.atTime(23, 59, 59);

        return Date.from(
                endOfDay.atZone(indiaZone).toInstant()
        );
    }

    //--------------------------------------
    // ✅ REGISTER EVENT
    //--------------------------------------

    @PostMapping("/register")
    public EventRegistration registerEvent(@RequestBody EventRegistration event) {

        event.setExpireAt(convertToISTEndOfDay(event.getExpireAt()));

        EventRegistration savedEvent = repo.save(event);

        // ⭐ Admin activity
        AdminActivity activity = new AdminActivity();
        activity.setAdminName("Admin");
        activity.setAction("Created Event");
        activity.setTarget(savedEvent.getTitle());
        activity.setTimestamp(new Date());

        activityRepo.save(activity);

        return savedEvent;
    }

    //--------------------------------------
    // ✅ UPDATE EVENT
    //--------------------------------------

    @PutMapping("/update/{id}")
    public EventRegistration updateEvent(
            @PathVariable String id,
            @RequestBody EventRegistration updatedEvent) {

        updatedEvent.setId(id);

        updatedEvent.setExpireAt(
                convertToISTEndOfDay(updatedEvent.getExpireAt())
        );

        EventRegistration saved = repo.save(updatedEvent);

        AdminActivity activity = new AdminActivity();
        activity.setAdminName("Admin");
        activity.setAction("Updated Event");
        activity.setTarget(saved.getTitle());
        activity.setTimestamp(new Date());

        activityRepo.save(activity);

        return saved;
    }

    //--------------------------------------
    // ✅ DELETE EVENT
    //--------------------------------------

    @DeleteMapping("/{id}")
    public String deleteEvent(@PathVariable String id) {

        EventRegistration event = repo.findById(id).orElse(null);

        if (event != null) {

            repo.deleteById(id);

            AdminActivity activity = new AdminActivity();
            activity.setAdminName("Admin");
            activity.setAction("Deleted Event");
            activity.setTarget(event.getTitle());
            activity.setTimestamp(new Date());

            activityRepo.save(activity);
        }

        return "Event deleted successfully!";
    }

    //--------------------------------------
    // ✅ GET ALL EVENTS (🔥 IMPORTANT)
    //--------------------------------------

    @GetMapping("/all")
    public List<EventRegistration> getAllEvents() {
        return repo.findAll(); // ✅ FIX
    }

    //--------------------------------------
    // ✅ ACTIVE EVENTS (DATE BASED)
    //--------------------------------------

    @GetMapping("/active")
    public List<EventRegistration> getActiveEvents() {
        return repo.findByExpireAtAfter(new Date());
    }

    //--------------------------------------
    // ✅ EXPIRED EVENTS (DATE BASED)
    //--------------------------------------

    @GetMapping("/expired")
    public List<EventRegistration> getAllExpiredEvents() {
        return repo.findByExpireAtBefore(new Date());
    }

    //--------------------------------------
    // ✅ USER HISTORY
    //--------------------------------------

    @GetMapping("/expired/{userId}")
    public List<EventRegistration> getUserExpiredEvents(
            @PathVariable String userId) {

        return repo.findByUserIdAndExpireAtBefore(
                userId,
                new Date()
        );
    }
}
