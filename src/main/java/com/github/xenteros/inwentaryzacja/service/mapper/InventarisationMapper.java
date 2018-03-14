package com.github.xenteros.inwentaryzacja.service.mapper;

import com.github.xenteros.inwentaryzacja.domain.*;
import com.github.xenteros.inwentaryzacja.service.dto.InventarisationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Inventarisation and its DTO InventarisationDTO.
 */
@Mapper(componentModel = "spring", uses = {WarehouseInventarisationMapper.class})
public interface InventarisationMapper extends EntityMapper<InventarisationDTO, Inventarisation> {

    @Mapping(source = "warehouseInventarisation.id", target = "warehouseInventarisationId")
    InventarisationDTO toDto(Inventarisation inventarisation);

    @Mapping(source = "warehouseInventarisationId", target = "warehouseInventarisation")
    Inventarisation toEntity(InventarisationDTO inventarisationDTO);

    default Inventarisation fromId(Long id) {
        if (id == null) {
            return null;
        }
        Inventarisation inventarisation = new Inventarisation();
        inventarisation.setId(id);
        return inventarisation;
    }
}
