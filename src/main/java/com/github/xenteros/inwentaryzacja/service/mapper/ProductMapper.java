package com.github.xenteros.inwentaryzacja.service.mapper;

import com.github.xenteros.inwentaryzacja.domain.*;
import com.github.xenteros.inwentaryzacja.service.dto.ProductDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Product and its DTO ProductDTO.
 */
@Mapper(componentModel = "spring", uses = {WarehouseMapper.class, ProductQuantityMapper.class})
public interface ProductMapper extends EntityMapper<ProductDTO, Product> {

    @Mapping(source = "productQuantity.id", target = "productQuantityId")
    ProductDTO toDto(Product product);

    @Mapping(target = "places", ignore = true)
    @Mapping(target = "suppliers", ignore = true)
    @Mapping(source = "productQuantityId", target = "productQuantity")
    Product toEntity(ProductDTO productDTO);

    default Product fromId(Long id) {
        if (id == null) {
            return null;
        }
        Product product = new Product();
        product.setId(id);
        return product;
    }
}
