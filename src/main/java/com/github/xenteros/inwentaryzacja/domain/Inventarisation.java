package com.github.xenteros.inwentaryzacja.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Inventarisation.
 */
@Entity
@Table(name = "inventarisation")
public class Inventarisation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_date")
    private LocalDate date;

    @ManyToOne
    private WarehouseInventarisation warehouseInventarisation;

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

    public Inventarisation date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public WarehouseInventarisation getWarehouseInventarisation() {
        return warehouseInventarisation;
    }

    public Inventarisation warehouseInventarisation(WarehouseInventarisation warehouseInventarisation) {
        this.warehouseInventarisation = warehouseInventarisation;
        return this;
    }

    public void setWarehouseInventarisation(WarehouseInventarisation warehouseInventarisation) {
        this.warehouseInventarisation = warehouseInventarisation;
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
        Inventarisation inventarisation = (Inventarisation) o;
        if (inventarisation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), inventarisation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Inventarisation{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
