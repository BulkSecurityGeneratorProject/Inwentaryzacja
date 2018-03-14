package com.github.xenteros.inwentaryzacja.service.mapper;

import com.github.xenteros.inwentaryzacja.domain.*;
import com.github.xenteros.inwentaryzacja.service.dto.PlaceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Place and its DTO PlaceDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class, WarehouseMapper.class})
public interface PlaceMapper extends EntityMapper<PlaceDTO, Place> {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "warehouse.id", target = "warehouseId")
    PlaceDTO toDto(Place place);

    @Mapping(source = "productId", target = "product")
    @Mapping(source = "warehouseId", target = "warehouse")
    Place toEntity(PlaceDTO placeDTO);

    default Place fromId(Long id) {
        if (id == null) {
            return null;
        }
        Place place = new Place();
        place.setId(id);
        return place;
    }
}
