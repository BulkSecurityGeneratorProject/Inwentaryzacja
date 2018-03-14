package com.github.xenteros.inwentaryzacja.service;

import com.github.xenteros.inwentaryzacja.service.dto.InventarisationDTO;
import java.util.List;

/**
 * Service Interface for managing Inventarisation.
 */
public interface InventarisationService {

    /**
     * Save a inventarisation.
     *
     * @param inventarisationDTO the entity to save
     * @return the persisted entity
     */
    InventarisationDTO save(InventarisationDTO inventarisationDTO);

    /**
     * Get all the inventarisations.
     *
     * @return the list of entities
     */
    List<InventarisationDTO> findAll();

    /**
     * Get the "id" inventarisation.
     *
     * @param id the id of the entity
     * @return the entity
     */
    InventarisationDTO findOne(Long id);

    /**
     * Delete the "id" inventarisation.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
