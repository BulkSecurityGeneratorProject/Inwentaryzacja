package com.github.xenteros.inwentaryzacja.service;

import com.github.xenteros.inwentaryzacja.service.dto.ProductQuantityDTO;
import java.util.List;

/**
 * Service Interface for managing ProductQuantity.
 */
public interface ProductQuantityService {

    /**
     * Save a productQuantity.
     *
     * @param productQuantityDTO the entity to save
     * @return the persisted entity
     */
    ProductQuantityDTO save(ProductQuantityDTO productQuantityDTO);

    /**
     * Get all the productQuantities.
     *
     * @return the list of entities
     */
    List<ProductQuantityDTO> findAll();

    /**
     * Get the "id" productQuantity.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ProductQuantityDTO findOne(Long id);

    /**
     * Delete the "id" productQuantity.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
