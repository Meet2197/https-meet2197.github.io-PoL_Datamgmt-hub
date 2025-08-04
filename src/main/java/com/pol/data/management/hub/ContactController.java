package com.pol.data.management.hub;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST Controller to handle API requests for contact messages.
 */
@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactMessageRepository contactMessageRepository;

    @Autowired
    public ContactController(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    /**
     * Endpoint to handle contact form submissions.
     *
     * @param contactMessage The ContactMessage object from the request body.
     * @return A ResponseEntity with a success message.
     */
    @PostMapping
    public ResponseEntity<String> submitContactForm(@RequestBody ContactMessage contactMessage) {
        try {
            contactMessageRepository.save(contactMessage);
            return ResponseEntity.ok("Message submitted successfully!");
        } catch (Exception e) {
            System.err.println("Failed to save contact message: " + e.getMessage());
            return ResponseEntity.status(500).body("Failed to submit message.");
        }
    }
}