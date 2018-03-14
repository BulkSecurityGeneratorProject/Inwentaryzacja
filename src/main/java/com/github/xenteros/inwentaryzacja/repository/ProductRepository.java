package com.github.xenteros.inwentaryzacja.repository;

import com.github.xenteros.inwentaryzacja.domain.Product;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("select distinct product from Product product left join fetch product.warehouses")
    List<Product> findAllWithEagerRelationships();

    @Query("select product from Product product left join fetch product.warehouses where product.id =:id")
    Product findOneWithEagerRelationships(@Param("id") Long id);

}
