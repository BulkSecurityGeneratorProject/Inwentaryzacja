package com.github.xenteros.inwentaryzacja.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A WarehouseInventarisation.
 */
@Entity
@Table(name = "warehouse_inventarisation")
public class WarehouseInventarisation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_date")
    private LocalDate date;

    @OneToMany(mappedBy = "warehouseInventarisation")
    @JsonIgnore
    private Set<Warehouse> warehouses = new HashSet<>();

    @OneToMany(mappedBy = "warehouseInventarisation")
    @JsonIgnore
    private Set<Inventarisation> inventarisations = new HashSet<>();

    @ManyToOne
    private ProductQuantity productQuantity;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public WarehouseInventarisation date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<Warehouse> getWarehouses() {
        return warehouses;
    }

    public WarehouseInventarisation warehouses(Set<Warehouse> warehouses) {
        this.warehouses = warehouses;
        return this;
    }

    public WarehouseInventarisation addWarehouse(Warehouse warehouse) {
        this.warehouses.add(warehouse);
        warehouse.setWarehouseInventarisation(this);
        return this;
    }

    public WarehouseInventarisation removeWarehouse(Warehouse warehouse) {
        this.warehouses.remove(warehouse);
        warehouse.setWarehouseInventarisation(null);
        return this;
    }

    public void setWarehouses(Set<Warehouse> warehouses) {
        this.warehouses = warehouses;
    }

    public Set<Inventarisation> getInventarisations() {
        return inventarisations;
    }

    public WarehouseInventarisation inventarisations(Set<Inventarisation> inventarisations) {
        this.inventarisations = inventarisations;
        return this;
    }

    public WarehouseInventarisation addInventarisation(Inventarisation inventarisation) {
        this.inventarisations.add(inventarisation);
        inventarisation.setWarehouseInventarisation(this);
        return this;
    }

    public WarehouseInventarisation removeInventarisation(Inventarisation inventarisation) {
        this.inventarisations.remove(inventarisation);
        inventarisation.setWarehouseInventarisation(null);
        return this;
    }

    public void setInventarisations(Set<Inventarisation> inventarisations) {
        this.inventarisations = inventarisations;
    }

    public ProductQuantity getProductQuantity() {
        return productQuantity;
    }

    public WarehouseInventarisation productQuantity(ProductQuantity productQuantity) {
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
        WarehouseInventarisation warehouseInventarisation = (WarehouseInventarisation) o;
        if (warehouseInventarisation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), warehouseInventarisation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WarehouseInventarisation{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
