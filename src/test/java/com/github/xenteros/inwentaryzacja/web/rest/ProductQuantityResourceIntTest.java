package com.github.xenteros.inwentaryzacja.web.rest;

import com.github.xenteros.inwentaryzacja.InwentaryzacjaApp;

import com.github.xenteros.inwentaryzacja.domain.ProductQuantity;
import com.github.xenteros.inwentaryzacja.repository.ProductQuantityRepository;
import com.github.xenteros.inwentaryzacja.service.ProductQuantityService;
import com.github.xenteros.inwentaryzacja.service.dto.ProductQuantityDTO;
import com.github.xenteros.inwentaryzacja.service.mapper.ProductQuantityMapper;
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
import java.util.List;

import static com.github.xenteros.inwentaryzacja.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ProductQuantityResource REST controller.
 *
 * @see ProductQuantityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = InwentaryzacjaApp.class)
public class ProductQuantityResourceIntTest {

    private static final Long DEFAULT_QUANTITY = 1L;
    private static final Long UPDATED_QUANTITY = 2L;

    @Autowired
    private ProductQuantityRepository productQuantityRepository;

    @Autowired
    private ProductQuantityMapper productQuantityMapper;

    @Autowired
    private ProductQuantityService productQuantityService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProductQuantityMockMvc;

    private ProductQuantity productQuantity;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductQuantityResource productQuantityResource = new ProductQuantityResource(productQuantityService);
        this.restProductQuantityMockMvc = MockMvcBuilders.standaloneSetup(productQuantityResource)
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
    public static ProductQuantity createEntity(EntityManager em) {
        ProductQuantity productQuantity = new ProductQuantity()
            .quantity(DEFAULT_QUANTITY);
        return productQuantity;
    }

    @Before
    public void initTest() {
        productQuantity = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductQuantity() throws Exception {
        int databaseSizeBeforeCreate = productQuantityRepository.findAll().size();

        // Create the ProductQuantity
        ProductQuantityDTO productQuantityDTO = productQuantityMapper.toDto(productQuantity);
        restProductQuantityMockMvc.perform(post("/api/product-quantities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productQuantityDTO)))
            .andExpect(status().isCreated());

        // Validate the ProductQuantity in the database
        List<ProductQuantity> productQuantityList = productQuantityRepository.findAll();
        assertThat(productQuantityList).hasSize(databaseSizeBeforeCreate + 1);
        ProductQuantity testProductQuantity = productQuantityList.get(productQuantityList.size() - 1);
        assertThat(testProductQuantity.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    public void createProductQuantityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productQuantityRepository.findAll().size();

        // Create the ProductQuantity with an existing ID
        productQuantity.setId(1L);
        ProductQuantityDTO productQuantityDTO = productQuantityMapper.toDto(productQuantity);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductQuantityMockMvc.perform(post("/api/product-quantities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productQuantityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProductQuantity in the database
        List<ProductQuantity> productQuantityList = productQuantityRepository.findAll();
        assertThat(productQuantityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProductQuantities() throws Exception {
        // Initialize the database
        productQuantityRepository.saveAndFlush(productQuantity);

        // Get all the productQuantityList
        restProductQuantityMockMvc.perform(get("/api/product-quantities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productQuantity.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY.intValue())));
    }

    @Test
    @Transactional
    public void getProductQuantity() throws Exception {
        // Initialize the database
        productQuantityRepository.saveAndFlush(productQuantity);

        // Get the productQuantity
        restProductQuantityMockMvc.perform(get("/api/product-quantities/{id}", productQuantity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productQuantity.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProductQuantity() throws Exception {
        // Get the productQuantity
        restProductQuantityMockMvc.perform(get("/api/product-quantities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductQuantity() throws Exception {
        // Initialize the database
        productQuantityRepository.saveAndFlush(productQuantity);
        int databaseSizeBeforeUpdate = productQuantityRepository.findAll().size();

        // Update the productQuantity
        ProductQuantity updatedProductQuantity = productQuantityRepository.findOne(productQuantity.getId());
        // Disconnect from session so that the updates on updatedProductQuantity are not directly saved in db
        em.detach(updatedProductQuantity);
        updatedProductQuantity
            .quantity(UPDATED_QUANTITY);
        ProductQuantityDTO productQuantityDTO = productQuantityMapper.toDto(updatedProductQuantity);

        restProductQuantityMockMvc.perform(put("/api/product-quantities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productQuantityDTO)))
            .andExpect(status().isOk());

        // Validate the ProductQuantity in the database
        List<ProductQuantity> productQuantityList = productQuantityRepository.findAll();
        assertThat(productQuantityList).hasSize(databaseSizeBeforeUpdate);
        ProductQuantity testProductQuantity = productQuantityList.get(productQuantityList.size() - 1);
        assertThat(testProductQuantity.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    public void updateNonExistingProductQuantity() throws Exception {
        int databaseSizeBeforeUpdate = productQuantityRepository.findAll().size();

        // Create the ProductQuantity
        ProductQuantityDTO productQuantityDTO = productQuantityMapper.toDto(productQuantity);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProductQuantityMockMvc.perform(put("/api/product-quantities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productQuantityDTO)))
            .andExpect(status().isCreated());

        // Validate the ProductQuantity in the database
        List<ProductQuantity> productQuantityList = productQuantityRepository.findAll();
        assertThat(productQuantityList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProductQuantity() throws Exception {
        // Initialize the database
        productQuantityRepository.saveAndFlush(productQuantity);
        int databaseSizeBeforeDelete = productQuantityRepository.findAll().size();

        // Get the productQuantity
        restProductQuantityMockMvc.perform(delete("/api/product-quantities/{id}", productQuantity.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductQuantity> productQuantityList = productQuantityRepository.findAll();
        assertThat(productQuantityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductQuantity.class);
        ProductQuantity productQuantity1 = new ProductQuantity();
        productQuantity1.setId(1L);
        ProductQuantity productQuantity2 = new ProductQuantity();
        productQuantity2.setId(productQuantity1.getId());
        assertThat(productQuantity1).isEqualTo(productQuantity2);
        productQuantity2.setId(2L);
        assertThat(productQuantity1).isNotEqualTo(productQuantity2);
        productQuantity1.setId(null);
        assertThat(productQuantity1).isNotEqualTo(productQuantity2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductQuantityDTO.class);
        ProductQuantityDTO productQuantityDTO1 = new ProductQuantityDTO();
        productQuantityDTO1.setId(1L);
        ProductQuantityDTO productQuantityDTO2 = new ProductQuantityDTO();
        assertThat(productQuantityDTO1).isNotEqualTo(productQuantityDTO2);
        productQuantityDTO2.setId(productQuantityDTO1.getId());
        assertThat(productQuantityDTO1).isEqualTo(productQuantityDTO2);
        productQuantityDTO2.setId(2L);
        assertThat(productQuantityDTO1).isNotEqualTo(productQuantityDTO2);
        productQuantityDTO1.setId(null);
        assertThat(productQuantityDTO1).isNotEqualTo(productQuantityDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(productQuantityMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(productQuantityMapper.fromId(null)).isNull();
    }
}
