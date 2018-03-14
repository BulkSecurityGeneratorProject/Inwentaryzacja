package com.github.xenteros.inwentaryzacja.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.github.xenteros.inwentaryzacja.domain.enumeration.Unit;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "unit")
    private Unit unit;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Set<Place> places = new HashSet<>();

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Set<Supplier> suppliers = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "product_warehouse",
               joinColumns = @JoinColumn(name="products_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="warehouses_id", referencedColumnName="id"))
    private Set<Warehouse> warehouses = new HashSet<>();

    @ManyToOne
    private ProductQuantity productQuantity;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Unit getUnit() {
        return unit;
    }

    public Product unit(Unit unit) {
        this.unit = unit;
        return this;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public Set<Place> getPlaces() {
        return places;
    }

    public Product places(Set<Place> places) {
        this.places = places;
        return this;
    }

    public Product addPlace(Place place) {
        this.places.add(place);
        place.setProduct(this);
        return this;
    }

    public Product removePlace(Place place) {
        this.places.remove(place);
        place.setProduct(null);
        return this;
    }

    public void setPlaces(Set<Place> places) {
        this.places = places;
    }

    public Set<Supplier> getSuppliers() {
        return suppliers;
    }

    public Product suppliers(Set<Supplier> suppliers) {
        this.suppliers = suppliers;
        return this;
    }

    public Product addSupplier(Supplier supplier) {
        this.suppliers.add(supplier);
        supplier.setProduct(this);
        return this;
    }

    public Product removeSupplier(Supplier supplier) {
        this.suppliers.remove(supplier);
        supplier.setProduct(null);
        return this;
    }

    public void setSuppliers(Set<Supplier> suppliers) {
        this.suppliers = suppliers;
    }

    public Set<Warehouse> getWarehouses() {
        return warehouses;
    }

    public Product warehouses(Set<Warehouse> warehouses) {
        this.warehouses = warehouses;
        return this;
    }

    public Product addWarehouse(Warehouse warehouse) {
        this.warehouses.add(warehouse);
        warehouse.getProducts().add(this);
        return this;
    }

    public Product removeWarehouse(Warehouse warehouse) {
        this.warehouses.remove(warehouse);
        warehouse.getProducts().remove(this);
        return this;
    }

    public void setWarehouses(Set<Warehouse> warehouses) {
        this.warehouses = warehouses;
    }

    public ProductQuantity getProductQuantity() {
        return productQuantity;
    }

    public Product productQuantity(ProductQuantity productQuantity) {
        this.productQuantity = productQuantity;
        return this;
    }

    public void setProductQuantity(ProductQuantity productQuantity) {
        this.productQuantity = productQuantity;
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
        Product product = (Product) o;
        if (product.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), product.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", unit='" + getUnit() + "'" +
            "}";
    }
}
