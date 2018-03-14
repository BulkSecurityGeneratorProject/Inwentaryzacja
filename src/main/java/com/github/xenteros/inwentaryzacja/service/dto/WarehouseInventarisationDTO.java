package com.github.xenteros.inwentaryzacja.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the WarehouseInventarisation entity.
 */
public class WarehouseInventarisationDTO implements Serializable {

    private Long id;

    private LocalDate date;

    private Long productQuantityId;

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

    public Long getProductQuantityId() {
        return productQuantityId;
    }

    public void setProductQuantityId(Long productQuantityId) {
        this.productQuantityId = productQuantityId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        WarehouseInventarisationDTO warehouseInventarisationDTO = (WarehouseInventarisationDTO) o;
        if(warehouseInventarisationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), warehouseInventarisationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "WarehouseInventarisationDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
