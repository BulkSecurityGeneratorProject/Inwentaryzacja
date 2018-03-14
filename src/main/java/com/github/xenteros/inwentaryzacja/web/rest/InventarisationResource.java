package com.github.xenteros.inwentaryzacja.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.github.xenteros.inwentaryzacja.service.InventarisationService;
import com.github.xenteros.inwentaryzacja.web.rest.errors.BadRequestAlertException;
import com.github.xenteros.inwentaryzacja.web.rest.util.HeaderUtil;
import com.github.xenteros.inwentaryzacja.service.dto.InventarisationDTO;
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
 * REST controller for managing Inventarisation.
 */
@RestController
@RequestMapping("/api")
public class InventarisationResource {

    private final Logger log = LoggerFactory.getLogger(InventarisationResource.class);

    private static final String ENTITY_NAME = "inventarisation";

    private final InventarisationService inventarisationService;

    public InventarisationResource(InventarisationService inventarisationService) {
        this.inventarisationService = inventarisationService;
    }

    /**
     * POST  /inventarisations : Create a new inventarisation.
     *
     * @param inventarisationDTO the inventarisationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new inventarisationDTO, or with status 400 (Bad Request) if the inventarisation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/inventarisations")
    @Timed
    public ResponseEntity<InventarisationDTO> createInventarisation(@RequestBody InventarisationDTO inventarisationDTO) throws URISyntaxException {
        log.debug("REST request to save Inventarisation : {}", inventarisationDTO);
        if (inventarisationDTO.getId() != null) {
            throw new BadRequestAlertException("A new inventarisation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InventarisationDTO result = inventarisationService.save(inventarisationDTO);
        return ResponseEntity.created(new URI("/api/inventarisations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /inventarisations : Updates an existing inventarisation.
     *
     * @param inventarisationDTO the inventarisationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated inventarisationDTO,
     * or with status 400 (Bad Request) if the inventarisationDTO is not valid,
     * or with status 500 (Internal Server Error) if the inventarisationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/inventarisations")
    @Timed
    public ResponseEntity<InventarisationDTO> updateInventarisation(@RequestBody InventarisationDTO inventarisationDTO) throws URISyntaxException {
        log.debug("REST request to update Inventarisation : {}", inventarisationDTO);
        if (inventarisationDTO.getId() == null) {
            return createInventarisation(inventarisationDTO);
        }
        InventarisationDTO result = inventarisationService.save(inventarisationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, inventarisationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /inventarisations : get all the inventarisations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of inventarisations in body
     */
    @GetMapping("/inventarisations")
    @Timed
    public List<InventarisationDTO> getAllInventarisations() {
        log.debug("REST request to get all Inventarisations");
        return inventarisationService.findAll();
        }

    /**
     * GET  /inventarisations/:id : get the "id" inventarisation.
     *
     * @param id the id of the inventarisationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the inventarisationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/inventarisations/{id}")
    @Timed
    public ResponseEntity<InventarisationDTO> getInventarisation(@PathVariable Long id) {
        log.debug("REST request to get Inventarisation : {}", id);
        InventarisationDTO inventarisationDTO = inventarisationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(inventarisationDTO));
    }

    /**
     * DELETE  /inventarisations/:id : delete the "id" inventarisation.
     *
     * @param id the id of the inventarisationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/inventarisations/{id}")
    @Timed
    public ResponseEntity<Void> deleteInventarisation(@PathVariable Long id) {
        log.debug("REST request to delete Inventarisation : {}", id);
        inventarisationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
