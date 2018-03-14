package com.github.xenteros.inwentaryzacja.repository;

import com.github.xenteros.inwentaryzacja.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
