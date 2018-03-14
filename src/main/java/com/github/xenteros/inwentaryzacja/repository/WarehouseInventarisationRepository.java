package com.github.xenteros.inwentaryzacja.repository;

import com.github.xenteros.inwentaryzacja.domain.WarehouseInventarisation;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the WarehouseInventarisation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WarehouseInventarisationRepository extends JpaRepository<WarehouseInventarisation, Long> {

}
