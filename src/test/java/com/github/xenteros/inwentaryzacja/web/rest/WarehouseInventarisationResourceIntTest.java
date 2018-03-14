package com.github.xenteros.inwentaryzacja.web.rest;

import com.github.xenteros.inwentaryzacja.InwentaryzacjaApp;

import com.github.xenteros.inwentaryzacja.domain.WarehouseInventarisation;
import com.github.xenteros.inwentaryzacja.repository.WarehouseInventarisationRepository;
import com.github.xenteros.inwentaryzacja.service.WarehouseInventarisationService;
import com.github.xenteros.inwentaryzacja.service.dto.WarehouseInventarisationDTO;
import com.github.xenteros.inwentaryzacja.service.mapper.WarehouseInventarisationMapper;
import com.github.xenteros.inwentaryzacja.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.github.xenteros.inwentaryzacja.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the WarehouseInventarisationResource REST controller.
 *
 * @see WarehouseInventarisationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InwentaryzacjaApp.class)
public class WarehouseInventarisationResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private WarehouseInventarisationRepository warehouseInventarisationRepository;

    @Autowired
    private WarehouseInventarisationMapper warehouseInventarisationMapper;

    @Autowired
    private WarehouseInventarisationService warehouseInventarisationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restWarehouseInventarisationMockMvc;

    private WarehouseInventarisation warehouseInventarisation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final WarehouseInventarisationResource warehouseInventarisationResource = new WarehouseInventarisationResource(warehouseInventarisationService);
        this.restWarehouseInventarisationMockMvc = MockMvcBuilders.standaloneSetup(warehouseInventarisationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WarehouseInventarisation createEntity(EntityManager em) {
        WarehouseInventarisation warehouseInventarisation = new WarehouseInventarisation()
            .date(DEFAULT_DATE);
        return warehouseInventarisation;
    }

    @Before
    public void initTest() {
        warehouseInventarisation = createEntity(em);
    }

    @Test
    @Transactional
    public void createWarehouseInventarisation() throws Exception {
        int databaseSizeBeforeCreate = warehouseInventarisationRepository.findAll().size();

        // Create the WarehouseInventarisation
        WarehouseInventarisationDTO warehouseInventarisationDTO = warehouseInventarisationMapper.toDto(warehouseInventarisation);
        restWarehouseInventarisationMockMvc.perform(post("/api/warehouse-inventarisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseInventarisationDTO)))
            .andExpect(status().isCreated());

        // Validate the WarehouseInventarisation in the database
        List<WarehouseInventarisation> warehouseInventarisationList = warehouseInventarisationRepository.findAll();
        assertThat(warehouseInventarisationList).hasSize(databaseSizeBeforeCreate + 1);
        WarehouseInventarisation testWarehouseInventarisation = warehouseInventarisationList.get(warehouseInventarisationList.size() - 1);
        assertThat(testWarehouseInventarisation.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createWarehouseInventarisationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = warehouseInventarisationRepository.findAll().size();

        // Create the WarehouseInventarisation with an existing ID
        warehouseInventarisation.setId(1L);
        WarehouseInventarisationDTO warehouseInventarisationDTO = warehouseInventarisationMapper.toDto(warehouseInventarisation);

        // An entity with an existing ID cannot be created, so this API call must fail
        restWarehouseInventarisationMockMvc.perform(post("/api/warehouse-inventarisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseInventarisationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the WarehouseInventarisation in the database
        List<WarehouseInventarisation> warehouseInventarisationList = warehouseInventarisationRepository.findAll();
        assertThat(warehouseInventarisationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllWarehouseInventarisations() throws Exception {
        // Initialize the database
        warehouseInventarisationRepository.saveAndFlush(warehouseInventarisation);

        // Get all the warehouseInventarisationList
        restWarehouseInventarisationMockMvc.perform(get("/api/warehouse-inventarisations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(warehouseInventarisation.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    public void getWarehouseInventarisation() throws Exception {
        // Initialize the database
        warehouseInventarisationRepository.saveAndFlush(warehouseInventarisation);

        // Get the warehouseInventarisation
        restWarehouseInventarisationMockMvc.perform(get("/api/warehouse-inventarisations/{id}", warehouseInventarisation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(warehouseInventarisation.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingWarehouseInventarisation() throws Exception {
        // Get the warehouseInventarisation
        restWarehouseInventarisationMockMvc.perform(get("/api/warehouse-inventarisations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateWarehouseInventarisation() throws Exception {
        // Initialize the database
        warehouseInventarisationRepository.saveAndFlush(warehouseInventarisation);
        int databaseSizeBeforeUpdate = warehouseInventarisationRepository.findAll().size();

        // Update the warehouseInventarisation
        WarehouseInventarisation updatedWarehouseInventarisation = warehouseInventarisationRepository.findOne(warehouseInventarisation.getId());
        // Disconnect from session so that the updates on updatedWarehouseInventarisation are not directly saved in db
        em.detach(updatedWarehouseInventarisation);
        updatedWarehouseInventarisation
            .date(UPDATED_DATE);
        WarehouseInventarisationDTO warehouseInventarisationDTO = warehouseInventarisationMapper.toDto(updatedWarehouseInventarisation);

        restWarehouseInventarisationMockMvc.perform(put("/api/warehouse-inventarisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseInventarisationDTO)))
            .andExpect(status().isOk());

        // Validate the WarehouseInventarisation in the database
        List<WarehouseInventarisation> warehouseInventarisationList = warehouseInventarisationRepository.findAll();
        assertThat(warehouseInventarisationList).hasSize(databaseSizeBeforeUpdate);
        WarehouseInventarisation testWarehouseInventarisation = warehouseInventarisationList.get(warehouseInventarisationList.size() - 1);
        assertThat(testWarehouseInventarisation.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingWarehouseInventarisation() throws Exception {
        int databaseSizeBeforeUpdate = warehouseInventarisationRepository.findAll().size();

        // Create the WarehouseInventarisation
        WarehouseInventarisationDTO warehouseInventarisationDTO = warehouseInventarisationMapper.toDto(warehouseInventarisation);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restWarehouseInventarisationMockMvc.perform(put("/api/warehouse-inventarisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(warehouseInventarisationDTO)))
            .andExpect(status().isCreated());

        // Validate the WarehouseInventarisation in the database
        List<WarehouseInventarisation> warehouseInventarisationList = warehouseInventarisationRepository.findAll();
        assertThat(warehouseInventarisationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteWarehouseInventarisation() throws Exception {
        // Initialize the database
        warehouseInventarisationRepository.saveAndFlush(warehouseInventarisation);
        int databaseSizeBeforeDelete = warehouseInventarisationRepository.findAll().size();

        // Get the warehouseInventarisation
        restWarehouseInventarisationMockMvc.perform(delete("/api/warehouse-inventarisations/{id}", warehouseInventarisation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<WarehouseInventarisation> warehouseInventarisationList = warehouseInventarisationRepository.findAll();
        assertThat(warehouseInventarisationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WarehouseInventarisation.class);
        WarehouseInventarisation warehouseInventarisation1 = new WarehouseInventarisation();
        warehouseInventarisation1.setId(1L);
        WarehouseInventarisation warehouseInventarisation2 = new WarehouseInventarisation();
        warehouseInventarisation2.setId(warehouseInventarisation1.getId());
        assertThat(warehouseInventarisation1).isEqualTo(warehouseInventarisation2);
        warehouseInventarisation2.setId(2L);
        assertThat(warehouseInventarisation1).isNotEqualTo(warehouseInventarisation2);
        warehouseInventarisation1.setId(null);
        assertThat(warehouseInventarisation1).isNotEqualTo(warehouseInventarisation2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WarehouseInventarisationDTO.class);
        WarehouseInventarisationDTO warehouseInventarisationDTO1 = new WarehouseInventarisationDTO();
        warehouseInventarisationDTO1.setId(1L);
        WarehouseInventarisationDTO warehouseInventarisationDTO2 = new WarehouseInventarisationDTO();
        assertThat(warehouseInventarisationDTO1).isNotEqualTo(warehouseInventarisationDTO2);
        warehouseInventarisationDTO2.setId(warehouseInventarisationDTO1.getId());
        assertThat(warehouseInventarisationDTO1).isEqualTo(warehouseInventarisationDTO2);
        warehouseInventarisationDTO2.setId(2L);
        assertThat(warehouseInventarisationDTO1).isNotEqualTo(warehouseInventarisationDTO2);
        warehouseInventarisationDTO1.setId(null);
        assertThat(warehouseInventarisationDTO1).isNotEqualTo(warehouseInventarisationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(warehouseInventarisationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(warehouseInventarisationMapper.fromId(null)).isNull();
    }
}
