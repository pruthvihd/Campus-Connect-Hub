package com.campus.backend.scheduler;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.campus.backend.model.EventRegistration;
import com.campus.backend.repository.EventRegistrationRepository;

@Component
public class EventCleanupScheduler {

    @Autowired
    private EventRegistrationRepository repo;

    // Runs every 1 minute
    @Scheduled(fixedRate = 60000)
    public void markExpiredEvents() {

        Date now = new Date();

        // ✅ Get only active events (not expired yet)
        List<EventRegistration> events = repo.findByExpiredFalse();

        for (EventRegistration event : events) {

            // ✅ Check if event is expired
            if (event.getExpireAt() != null && event.getExpireAt().before(now)) {

                // ✅ Mark as expired instead of deleting
                event.setExpired(true);
                repo.save(event);

                System.out.println("📌 Event marked as expired: " + event.getTitle());
            }
        }

        System.out.println("✅ Expiry check completed at: " + now);
    }
}
