package com.github.xenteros.inwentaryzacja.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Warehouse.
 */
@Entity
@Table(name = "warehouse")
public class Warehouse implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "warehouse")
    @JsonIgnore
    private Set<Place> places = new HashSet<>();

    @ManyToOne
    private WarehouseInventarisation warehouseInventarisation;

    @ManyToMany(mappedBy = "warehouses")
    @JsonIgnore
    private Set<Product> products = new HashSet<>();

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

    public Warehouse name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Place> getPlaces() {
        return places;
    }

    public Warehouse places(Set<Place> places) {
        this.places = places;
        return this;
    }

    public Warehouse addPlace(Place place) {
        this.places.add(place);
        place.setWarehouse(this);
        return this;
    }

    public Warehouse removePlace(Place place) {
        this.places.remove(place);
        place.setWarehouse(null);
        return this;
    }

    public void setPlaces(Set<Place> places) {
        this.places = places;
    }

    public WarehouseInventarisation getWarehouseInventarisation() {
        return warehouseInventarisation;
    }

    public Warehouse warehouseInventarisation(WarehouseInventarisation warehouseInventarisation) {
        this.warehouseInventarisation = warehouseInventarisation;
        return this;
    }

    public void setWarehouseInventarisation(WarehouseInventarisation warehouseInventarisation) {
        this.warehouseInventarisation = warehouseInventarisation;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public Warehouse products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public Warehouse addProduct(Product product) {
        this.products.add(product);
        product.getWarehouses().add(this);
        return this;
    }

    public Warehouse removeProduct(Product product) {
        this.products.remove(product);
        product.getWarehouses().remove(this);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
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
        Warehouse warehouse = (Warehouse) o;
        if (warehouse.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), warehouse.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Warehouse{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
