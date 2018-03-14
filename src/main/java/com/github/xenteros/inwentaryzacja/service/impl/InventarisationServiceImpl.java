package com.github.xenteros.inwentaryzacja.service.impl;

import com.github.xenteros.inwentaryzacja.service.InventarisationService;
import com.github.xenteros.inwentaryzacja.domain.Inventarisation;
import com.github.xenteros.inwentaryzacja.repository.InventarisationRepository;
import com.github.xenteros.inwentaryzacja.service.dto.InventarisationDTO;
import com.github.xenteros.inwentaryzacja.service.mapper.InventarisationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Inventarisation.
 */
@Service
@Transactional
public class InventarisationServiceImpl implements InventarisationService {

    private final Logger log = LoggerFactory.getLogger(InventarisationServiceImpl.class);

    private final InventarisationRepository inventarisationRepository;

    private final InventarisationMapper inventarisationMapper;

    public InventarisationServiceImpl(InventarisationRepository inventarisationRepository, InventarisationMapper inventarisationMapper) {
        this.inventarisationRepository = inventarisationRepository;
        this.inventarisationMapper = inventarisationMapper;
    }

    /**
     * Save a inventarisation.
     *
     * @param inventarisationDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public InventarisationDTO save(InventarisationDTO inventarisationDTO) {
        log.debug("Request to save Inventarisation : {}", inventarisationDTO);
        Inventarisation inventarisation = inventarisationMapper.toEntity(inventarisationDTO);
        inventarisation = inventarisationRepository.save(inventarisation);
        return inventarisationMapper.toDto(inventarisation);
    }

    /**
     * Get all the inventarisations.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<InventarisationDTO> findAll() {
        log.debug("Request to get all Inventarisations");
        return inventarisationRepository.findAll().stream()
            .map(inventarisationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one inventarisation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public InventarisationDTO findOne(Long id) {
        log.debug("Request to get Inventarisation : {}", id);
        Inventarisation inventarisation = inventarisationRepository.findOne(id);
        return inventarisationMapper.toDto(inventarisation);
    }

    /**
     * Delete the inventarisation by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Inventarisation : {}", id);
        inventarisationRepository.delete(id);
    }
}
