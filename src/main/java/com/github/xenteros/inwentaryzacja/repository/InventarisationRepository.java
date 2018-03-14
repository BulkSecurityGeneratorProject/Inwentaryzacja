package com.github.xenteros.inwentaryzacja.repository;

import com.github.xenteros.inwentaryzacja.domain.Inventarisation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Inventarisation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InventarisationRepository extends JpaRepository<Inventarisation, Long> {

}
