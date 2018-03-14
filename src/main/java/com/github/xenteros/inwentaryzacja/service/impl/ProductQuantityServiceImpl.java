package com.github.xenteros.inwentaryzacja.service.impl;

import com.github.xenteros.inwentaryzacja.service.ProductQuantityService;
import com.github.xenteros.inwentaryzacja.domain.ProductQuantity;
import com.github.xenteros.inwentaryzacja.repository.ProductQuantityRepository;
import com.github.xenteros.inwentaryzacja.service.dto.ProductQuantityDTO;
import com.github.xenteros.inwentaryzacja.service.mapper.ProductQuantityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing ProductQuantity.
 */
@Service
@Transactional
public class ProductQuantityServiceImpl implements ProductQuantityService {

    private final Logger log = LoggerFactory.getLogger(ProductQuantityServiceImpl.class);

    private final ProductQuantityRepository productQuantityRepository;

    private final ProductQuantityMapper productQuantityMapper;

    public ProductQuantityServiceImpl(ProductQuantityRepository productQuantityRepository, ProductQuantityMapper productQuantityMapper) {
        this.productQuantityRepository = productQuantityRepository;
        this.productQuantityMapper = productQuantityMapper;
    }

    /**
     * Save a productQuantity.
     *
     * @param productQuantityDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProductQuantityDTO save(ProductQuantityDTO productQuantityDTO) {
        log.debug("Request to save ProductQuantity : {}", productQuantityDTO);
        ProductQuantity productQuantity = productQuantityMapper.toEntity(productQuantityDTO);
        productQuantity = productQuantityRepository.save(productQuantity);
        return productQuantityMapper.toDto(productQuantity);
    }

    /**
     * Get all the productQuantities.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ProductQuantityDTO> findAll() {
        log.debug("Request to get all ProductQuantities");
        return productQuantityRepository.findAll().stream()
            .map(productQuantityMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one productQuantity by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProductQuantityDTO findOne(Long id) {
        log.debug("Request to get ProductQuantity : {}", id);
        ProductQuantity productQuantity = productQuantityRepository.findOne(id);
        return productQuantityMapper.toDto(productQuantity);
    }

    /**
     * Delete the productQuantity by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductQuantity : {}", id);
        productQuantityRepository.delete(id);
    }
}
