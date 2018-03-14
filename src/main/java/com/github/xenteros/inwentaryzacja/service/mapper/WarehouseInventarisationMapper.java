package com.github.xenteros.inwentaryzacja.service.mapper;

import com.github.xenteros.inwentaryzacja.domain.*;
import com.github.xenteros.inwentaryzacja.service.dto.WarehouseInventarisationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity WarehouseInventarisation and its DTO WarehouseInventarisationDTO.
 */
@Mapper(componentModel = "spring", uses = {ProductQuantityMapper.class})
public interface WarehouseInventarisationMapper extends EntityMapper<WarehouseInventarisationDTO, WarehouseInventarisation> {

    @Mapping(source = "productQuantity.id", target = "productQuantityId")
    WarehouseInventarisationDTO toDto(WarehouseInventarisation warehouseInventarisation);

    @Mapping(target = "warehouses", ignore = true)
    @Mapping(target = "inventarisations", ignore = true)
    @Mapping(source = "productQuantityId", target = "productQuantity")
    WarehouseInventarisation toEntity(WarehouseInventarisationDTO warehouseInventarisationDTO);

    default WarehouseInventarisation fromId(Long id) {
        if (id == null) {
            return null;
        }
        WarehouseInventarisation warehouseInventarisation = new WarehouseInventarisation();
        warehouseInventarisation.setId(id);
        return warehouseInventarisation;
    }
}
