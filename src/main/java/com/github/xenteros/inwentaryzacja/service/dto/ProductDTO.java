package com.github.xenteros.inwentaryzacja.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import com.github.xenteros.inwentaryzacja.domain.enumeration.Unit;

/**
 * A DTO for the Product entity.
 */
public class ProductDTO implements Serializable {

    private Long id;

    private String name;

    private Unit unit;

    private Set<WarehouseDTO> warehouses = new HashSet<>();

    private Long productQuantityId;

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

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public Set<WarehouseDTO> getWarehouses() {
        return warehouses;
    }

    public void setWarehouses(Set<WarehouseDTO> warehouses) {
        this.warehouses = warehouses;
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

        ProductDTO productDTO = (ProductDTO) o;
        if(productDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", unit='" + getUnit() + "'" +
            "}";
    }
}
