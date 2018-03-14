package com.github.xenteros.inwentaryzacja.service.mapper;

import com.github.xenteros.inwentaryzacja.domain.*;
import com.github.xenteros.inwentaryzacja.service.dto.ProductQuantityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ProductQuantity and its DTO ProductQuantityDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProductQuantityMapper extends EntityMapper<ProductQuantityDTO, ProductQuantity> {


    @Mapping(target = "products", ignore = true)
    @Mapping(target = "warehouseInventarisations", ignore = true)
    ProductQuantity toEntity(ProductQuantityDTO productQuantityDTO);

    default ProductQuantity fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProductQuantity productQuantity = new ProductQuantity();
        productQuantity.setId(id);
        return productQuantity;
    }
}
