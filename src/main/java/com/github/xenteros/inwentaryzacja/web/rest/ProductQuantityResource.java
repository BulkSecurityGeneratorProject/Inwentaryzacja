package com.github.xenteros.inwentaryzacja.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.github.xenteros.inwentaryzacja.service.ProductQuantityService;
import com.github.xenteros.inwentaryzacja.web.rest.errors.BadRequestAlertException;
import com.github.xenteros.inwentaryzacja.web.rest.util.HeaderUtil;
import com.github.xenteros.inwentaryzacja.service.dto.ProductQuantityDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ProductQuantity.
 */
@RestController
@RequestMapping("/api")
public class ProductQuantityResource {

    private final Logger log = LoggerFactory.getLogger(ProductQuantityResource.class);

    private static final String ENTITY_NAME = "productQuantity";

    private final ProductQuantityService productQuantityService;

    public ProductQuantityResource(ProductQuantityService productQuantityService) {
        this.productQuantityService = productQuantityService;
    }

    /**
     * POST  /product-quantities : Create a new productQuantity.
     *
     * @param productQuantityDTO the productQuantityDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productQuantityDTO, or with status 400 (Bad Request) if the productQuantity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-quantities")
    @Timed
    public ResponseEntity<ProductQuantityDTO> createProductQuantity(@RequestBody ProductQuantityDTO productQuantityDTO) throws URISyntaxException {
        log.debug("REST request to save ProductQuantity : {}", productQuantityDTO);
        if (productQuantityDTO.getId() != null) {
            throw new BadRequestAlertException("A new productQuantity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductQuantityDTO result = productQuantityService.save(productQuantityDTO);
        return ResponseEntity.created(new URI("/api/product-quantities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-quantities : Updates an existing productQuantity.
     *
     * @param productQuantityDTO the productQuantityDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productQuantityDTO,
     * or with status 400 (Bad Request) if the productQuantityDTO is not valid,
     * or with status 500 (Internal Server Error) if the productQuantityDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-quantities")
    @Timed
    public ResponseEntity<ProductQuantityDTO> updateProductQuantity(@RequestBody ProductQuantityDTO productQuantityDTO) throws URISyntaxException {
        log.debug("REST request to update ProductQuantity : {}", productQuantityDTO);
        if (productQuantityDTO.getId() == null) {
            return createProductQuantity(productQuantityDTO);
        }
        ProductQuantityDTO result = productQuantityService.save(productQuantityDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productQuantityDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-quantities : get all the productQuantities.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productQuantities in body
     */
    @GetMapping("/product-quantities")
    @Timed
    public List<ProductQuantityDTO> getAllProductQuantities() {
        log.debug("REST request to get all ProductQuantities");
        return productQuantityService.findAll();
        }

    /**
     * GET  /product-quantities/:id : get the "id" productQuantity.
     *
     * @param id the id of the productQuantityDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productQuantityDTO, or with status 404 (Not Found)
     */
    @GetMapping("/product-quantities/{id}")
    @Timed
    public ResponseEntity<ProductQuantityDTO> getProductQuantity(@PathVariable Long id) {
        log.debug("REST request to get ProductQuantity : {}", id);
        ProductQuantityDTO productQuantityDTO = productQuantityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(productQuantityDTO));
    }

    /**
     * DELETE  /product-quantities/:id : delete the "id" productQuantity.
     *
     * @param id the id of the productQuantityDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-quantities/{id}")
    @Timed
    public ResponseEntity<Void> deleteProductQuantity(@PathVariable Long id) {
        log.debug("REST request to delete ProductQuantity : {}", id);
        productQuantityService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
