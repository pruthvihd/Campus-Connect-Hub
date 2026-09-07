package com.campus.backend.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.campus.backend.model.AdminActivity;
import com.campus.backend.model.EventRegistration;
import com.campus.backend.repository.AdminActivityRepository;
import com.campus.backend.repository.EventRegistrationRepository;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventRegistrationRepository repo;

    @Autowired
    private AdminActivityRepository activityRepo;

    //--------------------------------------
    // ⭐ CONVERT TO IST END OF DAY
    //--------------------------------------

    private Date convertToISTEndOfDay(Date inputDate) {
        if (inputDate == null) {
            return null;
        }

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
    public ResponseEntity<EventRegistration> registerEvent(@RequestBody EventRegistration event) {

        if (event.getExpireAt() != null) {
            event.setExpireAt(convertToISTEndOfDay(event.getExpireAt()));
        }

        EventRegistration savedEvent = repo.save(event);

        // ⭐ Admin activity
        AdminActivity activity = new AdminActivity();
        activity.setAdminName("Admin");
        activity.setAction("Created Event");
        activity.setTarget(savedEvent.getTitle() != null ? savedEvent.getTitle() : savedEvent.getId());
        activity.setTimestamp(new Date());

        activityRepo.save(activity);

        return ResponseEntity.ok(savedEvent);
    }

    //--------------------------------------
    // ✅ UPDATE EVENT
    //--------------------------------------

    @PutMapping("/update/{id}")
    public ResponseEntity<EventRegistration> updateEvent(
            @PathVariable String id,
            @RequestBody EventRegistration updatedEvent) {

        updatedEvent.setId(id);

        if (updatedEvent.getExpireAt() != null) {
            updatedEvent.setExpireAt(
                    convertToISTEndOfDay(updatedEvent.getExpireAt())
            );
        }

        EventRegistration saved = repo.save(updatedEvent);

        AdminActivity activity = new AdminActivity();
        activity.setAdminName("Admin");
        activity.setAction("Updated Event");
        activity.setTarget(saved.getTitle() != null ? saved.getTitle() : saved.getId());
        activity.setTimestamp(new Date());

        activityRepo.save(activity);

        return ResponseEntity.ok(saved);
    }

    //--------------------------------------
    // ✅ DELETE EVENT
    //--------------------------------------

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEvent(@PathVariable String id) {

        EventRegistration event = repo.findById(id).orElse(null);

        if (event != null) {

            repo.deleteById(id);

            AdminActivity activity = new AdminActivity();
            activity.setAdminName("Admin");
            activity.setAction("Deleted Event");
            activity.setTarget(event.getTitle() != null ? event.getTitle() : event.getId());
            activity.setTimestamp(new Date());

            activityRepo.save(activity);
            return ResponseEntity.ok("Event deleted successfully!");
        }

        return ResponseEntity.status(404).body("Event not found!");
    }

    //--------------------------------------
    // ✅ GET ALL EVENTS (Both /events and /events/all)
    //--------------------------------------

    @GetMapping({"", "/all"})
    public List<EventRegistration> getAllEvents() {
        return repo.findAll();
    }

    //--------------------------------------
    // ✅ GET EVENT BY ID
    //--------------------------------------

    @GetMapping("/{id}")
    public ResponseEntity<EventRegistration> getEventById(@PathVariable String id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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
