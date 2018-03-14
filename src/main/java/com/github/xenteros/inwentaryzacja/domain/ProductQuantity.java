package com.github.xenteros.inwentaryzacja.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ProductQuantity.
 */
@Entity
@Table(name = "product_quantity")
public class ProductQuantity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantity")
    private Long quantity;

    @OneToMany(mappedBy = "productQuantity")
    @JsonIgnore
    private Set<Product> products = new HashSet<>();

    @OneToMany(mappedBy = "productQuantity")
    @JsonIgnore
    private Set<WarehouseInventarisation> warehouseInventarisations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getQuantity() {
        return quantity;
    }

    public ProductQuantity quantity(Long quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public ProductQuantity products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public ProductQuantity addProduct(Product product) {
        this.products.add(product);
        product.setProductQuantity(this);
        return this;
    }

    public ProductQuantity removeProduct(Product product) {
        this.products.remove(product);
        product.setProductQuantity(null);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Set<WarehouseInventarisation> getWarehouseInventarisations() {
        return warehouseInventarisations;
    }

    public ProductQuantity warehouseInventarisations(Set<WarehouseInventarisation> warehouseInventarisations) {
        this.warehouseInventarisations = warehouseInventarisations;
        return this;
    }

    public ProductQuantity addWarehouseInventarisation(WarehouseInventarisation warehouseInventarisation) {
        this.warehouseInventarisations.add(warehouseInventarisation);
        warehouseInventarisation.setProductQuantity(this);
        return this;
    }

    public ProductQuantity removeWarehouseInventarisation(WarehouseInventarisation warehouseInventarisation) {
        this.warehouseInventarisations.remove(warehouseInventarisation);
        warehouseInventarisation.setProductQuantity(null);
        return this;
    }

    public void setWarehouseInventarisations(Set<WarehouseInventarisation> warehouseInventarisations) {
        this.warehouseInventarisations = warehouseInventarisations;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ProductQuantity productQuantity = (ProductQuantity) o;
        if (productQuantity.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productQuantity.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductQuantity{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            "}";
    }
}
