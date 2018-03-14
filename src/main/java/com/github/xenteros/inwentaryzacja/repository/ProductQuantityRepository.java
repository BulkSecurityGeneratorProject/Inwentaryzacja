package com.github.xenteros.inwentaryzacja.repository;

import com.github.xenteros.inwentaryzacja.domain.ProductQuantity;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ProductQuantity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductQuantityRepository extends JpaRepository<ProductQuantity, Long> {

}
