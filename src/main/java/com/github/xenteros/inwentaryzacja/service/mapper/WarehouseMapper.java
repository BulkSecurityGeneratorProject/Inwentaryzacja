package com.github.xenteros.inwentaryzacja.service.mapper;

import com.github.xenteros.inwentaryzacja.domain.*;
import com.github.xenteros.inwentaryzacja.service.dto.WarehouseDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Warehouse and its DTO WarehouseDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductMapper.class, WarehouseInventarisationMapper.class})
public interface WarehouseMapper extends EntityMapper<WarehouseDTO, Warehouse> {

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "warehouseInventarisation.id", target = "warehouseInventarisationId")
    WarehouseDTO toDto(Warehouse warehouse);

    @Mapping(target = "places", ignore = true)
    @Mapping(source = "productId", target = "product")
    @Mapping(source = "warehouseInventarisationId", target = "warehouseInventarisation")
    @Mapping(target = "products", ignore = true)
    Warehouse toEntity(WarehouseDTO warehouseDTO);

    default Warehouse fromId(Long id) {
        if (id == null) {
            return null;
        }
        Warehouse warehouse = new Warehouse();
        warehouse.setId(id);
        return warehouse;
    }
}
