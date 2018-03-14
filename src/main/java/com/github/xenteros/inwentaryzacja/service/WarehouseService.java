package com.github.xenteros.inwentaryzacja.service;

import com.github.xenteros.inwentaryzacja.service.dto.WarehouseDTO;
import java.util.List;

/**
 * Service Interface for managing Warehouse.
 */
public interface WarehouseService {

    /**
     * Save a warehouse.
     *
     * @param warehouseDTO the entity to save
     * @return the persisted entity
     */
    WarehouseDTO save(WarehouseDTO warehouseDTO);

    /**
     * Get all the warehouses.
     *
     * @return the list of entities
     */
    List<WarehouseDTO> findAll();

    /**
     * Get the "id" warehouse.
     *
     * @param id the id of the entity
     * @return the entity
     */
    WarehouseDTO findOne(Long id);

    /**
     * Delete the "id" warehouse.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
