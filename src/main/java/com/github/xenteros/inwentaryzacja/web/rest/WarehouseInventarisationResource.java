package com.github.xenteros.inwentaryzacja.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.github.xenteros.inwentaryzacja.service.WarehouseInventarisationService;
import com.github.xenteros.inwentaryzacja.web.rest.errors.BadRequestAlertException;
import com.github.xenteros.inwentaryzacja.web.rest.util.HeaderUtil;
import com.github.xenteros.inwentaryzacja.service.dto.WarehouseInventarisationDTO;
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
 * REST controller for managing WarehouseInventarisation.
 */
@RestController
@RequestMapping("/api")
public class WarehouseInventarisationResource {

    private final Logger log = LoggerFactory.getLogger(WarehouseInventarisationResource.class);

    private static final String ENTITY_NAME = "warehouseInventarisation";

    private final WarehouseInventarisationService warehouseInventarisationService;

    public WarehouseInventarisationResource(WarehouseInventarisationService warehouseInventarisationService) {
        this.warehouseInventarisationService = warehouseInventarisationService;
    }

    /**
     * POST  /warehouse-inventarisations : Create a new warehouseInventarisation.
     *
     * @param warehouseInventarisationDTO the warehouseInventarisationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new warehouseInventarisationDTO, or with status 400 (Bad Request) if the warehouseInventarisation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/warehouse-inventarisations")
    @Timed
    public ResponseEntity<WarehouseInventarisationDTO> createWarehouseInventarisation(@RequestBody WarehouseInventarisationDTO warehouseInventarisationDTO) throws URISyntaxException {
        log.debug("REST request to save WarehouseInventarisation : {}", warehouseInventarisationDTO);
        if (warehouseInventarisationDTO.getId() != null) {
            throw new BadRequestAlertException("A new warehouseInventarisation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        WarehouseInventarisationDTO result = warehouseInventarisationService.save(warehouseInventarisationDTO);
        return ResponseEntity.created(new URI("/api/warehouse-inventarisations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /warehouse-inventarisations : Updates an existing warehouseInventarisation.
     *
     * @param warehouseInventarisationDTO the warehouseInventarisationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated warehouseInventarisationDTO,
     * or with status 400 (Bad Request) if the warehouseInventarisationDTO is not valid,
     * or with status 500 (Internal Server Error) if the warehouseInventarisationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/warehouse-inventarisations")
    @Timed
    public ResponseEntity<WarehouseInventarisationDTO> updateWarehouseInventarisation(@RequestBody WarehouseInventarisationDTO warehouseInventarisationDTO) throws URISyntaxException {
        log.debug("REST request to update WarehouseInventarisation : {}", warehouseInventarisationDTO);
        if (warehouseInventarisationDTO.getId() == null) {
            return createWarehouseInventarisation(warehouseInventarisationDTO);
        }
        WarehouseInventarisationDTO result = warehouseInventarisationService.save(warehouseInventarisationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, warehouseInventarisationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /warehouse-inventarisations : get all the warehouseInventarisations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of warehouseInventarisations in body
     */
    @GetMapping("/warehouse-inventarisations")
    @Timed
    public List<WarehouseInventarisationDTO> getAllWarehouseInventarisations() {
        log.debug("REST request to get all WarehouseInventarisations");
        return warehouseInventarisationService.findAll();
        }

    /**
     * GET  /warehouse-inventarisations/:id : get the "id" warehouseInventarisation.
     *
     * @param id the id of the warehouseInventarisationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the warehouseInventarisationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/warehouse-inventarisations/{id}")
    @Timed
    public ResponseEntity<WarehouseInventarisationDTO> getWarehouseInventarisation(@PathVariable Long id) {
        log.debug("REST request to get WarehouseInventarisation : {}", id);
        WarehouseInventarisationDTO warehouseInventarisationDTO = warehouseInventarisationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(warehouseInventarisationDTO));
    }

    /**
     * DELETE  /warehouse-inventarisations/:id : delete the "id" warehouseInventarisation.
     *
     * @param id the id of the warehouseInventarisationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/warehouse-inventarisations/{id}")
    @Timed
    public ResponseEntity<Void> deleteWarehouseInventarisation(@PathVariable Long id) {
        log.debug("REST request to delete WarehouseInventarisation : {}", id);
        warehouseInventarisationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
