package com.github.xenteros.inwentaryzacja.web.rest;

import com.github.xenteros.inwentaryzacja.InwentaryzacjaApp;

import com.github.xenteros.inwentaryzacja.domain.Inventarisation;
import com.github.xenteros.inwentaryzacja.repository.InventarisationRepository;
import com.github.xenteros.inwentaryzacja.service.InventarisationService;
import com.github.xenteros.inwentaryzacja.service.dto.InventarisationDTO;
import com.github.xenteros.inwentaryzacja.service.mapper.InventarisationMapper;
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
 * Test class for the InventarisationResource REST controller.
 *
 * @see InventarisationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InwentaryzacjaApp.class)
public class InventarisationResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private InventarisationRepository inventarisationRepository;

    @Autowired
    private InventarisationMapper inventarisationMapper;

    @Autowired
    private InventarisationService inventarisationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInventarisationMockMvc;

    private Inventarisation inventarisation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InventarisationResource inventarisationResource = new InventarisationResource(inventarisationService);
        this.restInventarisationMockMvc = MockMvcBuilders.standaloneSetup(inventarisationResource)
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
    public static Inventarisation createEntity(EntityManager em) {
        Inventarisation inventarisation = new Inventarisation()
            .date(DEFAULT_DATE);
        return inventarisation;
    }

    @Before
    public void initTest() {
        inventarisation = createEntity(em);
    }

    @Test
    @Transactional
    public void createInventarisation() throws Exception {
        int databaseSizeBeforeCreate = inventarisationRepository.findAll().size();

        // Create the Inventarisation
        InventarisationDTO inventarisationDTO = inventarisationMapper.toDto(inventarisation);
        restInventarisationMockMvc.perform(post("/api/inventarisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inventarisationDTO)))
            .andExpect(status().isCreated());

        // Validate the Inventarisation in the database
        List<Inventarisation> inventarisationList = inventarisationRepository.findAll();
        assertThat(inventarisationList).hasSize(databaseSizeBeforeCreate + 1);
        Inventarisation testInventarisation = inventarisationList.get(inventarisationList.size() - 1);
        assertThat(testInventarisation.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createInventarisationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = inventarisationRepository.findAll().size();

        // Create the Inventarisation with an existing ID
        inventarisation.setId(1L);
        InventarisationDTO inventarisationDTO = inventarisationMapper.toDto(inventarisation);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInventarisationMockMvc.perform(post("/api/inventarisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inventarisationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Inventarisation in the database
        List<Inventarisation> inventarisationList = inventarisationRepository.findAll();
        assertThat(inventarisationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllInventarisations() throws Exception {
        // Initialize the database
        inventarisationRepository.saveAndFlush(inventarisation);

        // Get all the inventarisationList
        restInventarisationMockMvc.perform(get("/api/inventarisations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(inventarisation.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    public void getInventarisation() throws Exception {
        // Initialize the database
        inventarisationRepository.saveAndFlush(inventarisation);

        // Get the inventarisation
        restInventarisationMockMvc.perform(get("/api/inventarisations/{id}", inventarisation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(inventarisation.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInventarisation() throws Exception {
        // Get the inventarisation
        restInventarisationMockMvc.perform(get("/api/inventarisations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInventarisation() throws Exception {
        // Initialize the database
        inventarisationRepository.saveAndFlush(inventarisation);
        int databaseSizeBeforeUpdate = inventarisationRepository.findAll().size();

        // Update the inventarisation
        Inventarisation updatedInventarisation = inventarisationRepository.findOne(inventarisation.getId());
        // Disconnect from session so that the updates on updatedInventarisation are not directly saved in db
        em.detach(updatedInventarisation);
        updatedInventarisation
            .date(UPDATED_DATE);
        InventarisationDTO inventarisationDTO = inventarisationMapper.toDto(updatedInventarisation);

        restInventarisationMockMvc.perform(put("/api/inventarisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inventarisationDTO)))
            .andExpect(status().isOk());

        // Validate the Inventarisation in the database
        List<Inventarisation> inventarisationList = inventarisationRepository.findAll();
        assertThat(inventarisationList).hasSize(databaseSizeBeforeUpdate);
        Inventarisation testInventarisation = inventarisationList.get(inventarisationList.size() - 1);
        assertThat(testInventarisation.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingInventarisation() throws Exception {
        int databaseSizeBeforeUpdate = inventarisationRepository.findAll().size();

        // Create the Inventarisation
        InventarisationDTO inventarisationDTO = inventarisationMapper.toDto(inventarisation);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restInventarisationMockMvc.perform(put("/api/inventarisations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(inventarisationDTO)))
            .andExpect(status().isCreated());

        // Validate the Inventarisation in the database
        List<Inventarisation> inventarisationList = inventarisationRepository.findAll();
        assertThat(inventarisationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteInventarisation() throws Exception {
        // Initialize the database
        inventarisationRepository.saveAndFlush(inventarisation);
        int databaseSizeBeforeDelete = inventarisationRepository.findAll().size();

        // Get the inventarisation
        restInventarisationMockMvc.perform(delete("/api/inventarisations/{id}", inventarisation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Inventarisation> inventarisationList = inventarisationRepository.findAll();
        assertThat(inventarisationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Inventarisation.class);
        Inventarisation inventarisation1 = new Inventarisation();
        inventarisation1.setId(1L);
        Inventarisation inventarisation2 = new Inventarisation();
        inventarisation2.setId(inventarisation1.getId());
        assertThat(inventarisation1).isEqualTo(inventarisation2);
        inventarisation2.setId(2L);
        assertThat(inventarisation1).isNotEqualTo(inventarisation2);
        inventarisation1.setId(null);
        assertThat(inventarisation1).isNotEqualTo(inventarisation2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(InventarisationDTO.class);
        InventarisationDTO inventarisationDTO1 = new InventarisationDTO();
        inventarisationDTO1.setId(1L);
        InventarisationDTO inventarisationDTO2 = new InventarisationDTO();
        assertThat(inventarisationDTO1).isNotEqualTo(inventarisationDTO2);
        inventarisationDTO2.setId(inventarisationDTO1.getId());
        assertThat(inventarisationDTO1).isEqualTo(inventarisationDTO2);
        inventarisationDTO2.setId(2L);
        assertThat(inventarisationDTO1).isNotEqualTo(inventarisationDTO2);
        inventarisationDTO1.setId(null);
        assertThat(inventarisationDTO1).isNotEqualTo(inventarisationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(inventarisationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(inventarisationMapper.fromId(null)).isNull();
    }
}
