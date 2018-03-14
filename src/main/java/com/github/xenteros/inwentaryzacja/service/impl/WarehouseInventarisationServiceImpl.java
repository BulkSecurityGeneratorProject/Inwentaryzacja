package com.github.xenteros.inwentaryzacja.service.impl;

import com.github.xenteros.inwentaryzacja.service.WarehouseInventarisationService;
import com.github.xenteros.inwentaryzacja.domain.WarehouseInventarisation;
import com.github.xenteros.inwentaryzacja.repository.WarehouseInventarisationRepository;
import com.github.xenteros.inwentaryzacja.service.dto.WarehouseInventarisationDTO;
import com.github.xenteros.inwentaryzacja.service.mapper.WarehouseInventarisationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing WarehouseInventarisation.
 */
@Service
@Transactional
public class WarehouseInventarisationServiceImpl implements WarehouseInventarisationService {

    private final Logger log = LoggerFactory.getLogger(WarehouseInventarisationServiceImpl.class);

    private final WarehouseInventarisationRepository warehouseInventarisationRepository;

    private final WarehouseInventarisationMapper warehouseInventarisationMapper;

    public WarehouseInventarisationServiceImpl(WarehouseInventarisationRepository warehouseInventarisationRepository, WarehouseInventarisationMapper warehouseInventarisationMapper) {
        this.warehouseInventarisationRepository = warehouseInventarisationRepository;
        this.warehouseInventarisationMapper = warehouseInventarisationMapper;
    }

    /**
     * Save a warehouseInventarisation.
     *
     * @param warehouseInventarisationDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public WarehouseInventarisationDTO save(WarehouseInventarisationDTO warehouseInventarisationDTO) {
        log.debug("Request to save WarehouseInventarisation : {}", warehouseInventarisationDTO);
        WarehouseInventarisation warehouseInventarisation = warehouseInventarisationMapper.toEntity(warehouseInventarisationDTO);
        warehouseInventarisation = warehouseInventarisationRepository.save(warehouseInventarisation);
        return warehouseInventarisationMapper.toDto(warehouseInventarisation);
    }

    /**
     * Get all the warehouseInventarisations.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<WarehouseInventarisationDTO> findAll() {
        log.debug("Request to get all WarehouseInventarisations");
        return warehouseInventarisationRepository.findAll().stream()
            .map(warehouseInventarisationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one warehouseInventarisation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public WarehouseInventarisationDTO findOne(Long id) {
        log.debug("Request to get WarehouseInventarisation : {}", id);
        WarehouseInventarisation warehouseInventarisation = warehouseInventarisationRepository.findOne(id);
        return warehouseInventarisationMapper.toDto(warehouseInventarisation);
    }

    /**
     * Delete the warehouseInventarisation by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete WarehouseInventarisation : {}", id);
        warehouseInventarisationRepository.delete(id);
    }
}
