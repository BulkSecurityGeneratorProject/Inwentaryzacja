package com.github.xenteros.inwentaryzacja.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Inventarisation entity.
 */
public class InventarisationDTO implements Serializable {

    private Long id;

    private LocalDate date;

    private Long warehouseInventarisationId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getWarehouseInventarisationId() {
        return warehouseInventarisationId;
    }

    public void setWarehouseInventarisationId(Long warehouseInventarisationId) {
        this.warehouseInventarisationId = warehouseInventarisationId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        InventarisationDTO inventarisationDTO = (InventarisationDTO) o;
        if(inventarisationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), inventarisationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InventarisationDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
