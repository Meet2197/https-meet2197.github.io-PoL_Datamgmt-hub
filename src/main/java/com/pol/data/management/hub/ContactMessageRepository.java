package com.pol.data.management.hub;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ContactMessage entity.
 * This provides methods to interact with the database without writing boilerplate code.
 */
@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}