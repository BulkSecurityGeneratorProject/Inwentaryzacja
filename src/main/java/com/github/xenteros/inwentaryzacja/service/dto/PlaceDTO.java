package com.github.xenteros.inwentaryzacja.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Place entity.
 */
public class PlaceDTO implements Serializable {

    private Long id;

    private String name;

    private Long productId;

    private Long warehouseId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Long warehouseId) {
        this.warehouseId = warehouseId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PlaceDTO placeDTO = (PlaceDTO) o;
        if(placeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), placeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PlaceDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
