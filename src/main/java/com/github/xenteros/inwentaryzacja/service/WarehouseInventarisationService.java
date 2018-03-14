package com.github.xenteros.inwentaryzacja.service;

import com.github.xenteros.inwentaryzacja.service.dto.WarehouseInventarisationDTO;
import java.util.List;

/**
 * Service Interface for managing WarehouseInventarisation.
 */
public interface WarehouseInventarisationService {

    /**
     * Save a warehouseInventarisation.
     *
     * @param warehouseInventarisationDTO the entity to save
     * @return the persisted entity
     */
    WarehouseInventarisationDTO save(WarehouseInventarisationDTO warehouseInventarisationDTO);

    /**
     * Get all the warehouseInventarisations.
     *
     * @return the list of entities
     */
    List<WarehouseInventarisationDTO> findAll();

    /**
     * Get the "id" warehouseInventarisation.
     *
     * @param id the id of the entity
     * @return the entity
     */
    WarehouseInventarisationDTO findOne(Long id);

    /**
     * Delete the "id" warehouseInventarisation.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
