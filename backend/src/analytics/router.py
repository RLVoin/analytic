import array

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select, func, join, and_
from sqlalchemy.orm import selectinload, joinedload
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_async_session
# from src.analytics.models import analytic, data, departament, direction
from src.analytics.models import DataOrm, DepartamentOrm, DirectionOrm, ChartConfig
from src.database import User
from src.auth.auth import current_user
from src.analytics.schemas import AnalyticDTO, DepartamentDTO, DirectionDTO, DataDTO, NewData, DataWithTableId, \
    DataWithoutJoinDTO, ChartConfigDTO, ChartConfigSchema
import asyncio

router = APIRouter(
    prefix="/charts",
    tags=["Charts"]
)


@router.get("/get_data/")
async def get_data(table_id: int = None, departament_id: int = None, direction_id: int = None,
                   session: AsyncSession = Depends(get_async_session)):
    query = (
        select(DataOrm)
        .options(joinedload(DataOrm.direction))
        .options(joinedload(DataOrm.departament))
        .order_by(DataOrm.id)
    )

    filters = []

    if table_id:
        filters.append(DataOrm.table_id == table_id)

    if departament_id:
        filters.append(DataOrm.departament_id == departament_id)

    if direction_id:
        filters.append(DataOrm.direction_id == direction_id)

    if filters:
        query = query.filter(and_(*filters))

    res = await session.execute(query)
    result_orm = res.scalars().all()
    result_dto = [DataDTO.model_validate(row, from_attributes=True) for row in result_orm]
    return result_dto


@router.get("/get_dep_data/{dep_id}")
async def get_data(dep_id: int, session: AsyncSession = Depends(get_async_session)):
    query = (
        select(DataOrm)
        .filter(and_(DataOrm.departament_id == dep_id, DataOrm.direction_id == 1))
        .options(joinedload(DataOrm.direction))
        .options(joinedload(DataOrm.departament))
        .order_by(DataOrm.month)
    )

    res = await session.execute(query)
    result_orm = res.scalars().all()
    result_dto = [DataDTO.model_validate(row, from_attributes=True) for row in result_orm]
    return result_dto


@router.get("/get_chart")
async def get_chart(session: AsyncSession = Depends(get_async_session)):
    pass


@router.put("/update_data")
async def update_data(new_data: NewData, session: AsyncSession = Depends(get_async_session)):
    for key, value in new_data.values.items():
        query = (
            select(DataOrm)
            .filter(and_(
                DataOrm.direction_id == new_data.direction_id,
                DataOrm.departament_id == new_data.departament_id,
                DataOrm.year == new_data.year,
                DataOrm.month == int(key)
            ))
        )

        res = await session.execute(query)
        obj = res.scalar_one_or_none()
        if obj is None:
            raise HTTPException(status_code=404, detail="Data not found")

        obj.value = value

    await session.commit()

    return {"message": "Data updated successfully"}


@router.get("/get_directions")
async def get_directions(session: AsyncSession = Depends(get_async_session)):
    query = (
        select(DirectionOrm)
    )

    res = await session.execute(query)
    result_orm = res.scalars().all()
    # return result_orm
    result_dto = [DirectionDTO.model_validate(row, from_attributes=True) for row in result_orm]
    return result_dto


@router.get("/get_departaments")
async def get_departaments(session: AsyncSession = Depends(get_async_session)):
    query = (
        select(DepartamentOrm)
    )

    res = await session.execute(query)
    result_orm = res.scalars().all()
    result_dto = [DepartamentDTO.model_validate(row, from_attributes=True) for row in result_orm]
    return result_dto


@router.get("/get_data_dep")
async def get_data_dep(session: AsyncSession = Depends(get_async_session)):
    query = (
        select(DepartamentOrm)
        .filter(DepartamentOrm.id == 1)
        .options(selectinload(DepartamentOrm.dataDepartament))
    )

    res = await session.execute(query)
    result_orm = res.scalars().all()

    # Фильтруем данные по direction_id
    filtered_result = [dept for dept in result_orm[0].dataDepartament if dept.direction_id == 1]

    # Сортируем по месяцу
    sorted_result = sorted(filtered_result, key=lambda x: x.month)

    # Преобразование в DTO
    result_dto = [DataWithoutJoinDTO.model_validate(row, from_attributes=True) for row in sorted_result]
    print(result_dto)  # Для отладки
    return result_dto


@router.get("/get_config")
async def get_config(session: AsyncSession = Depends(get_async_session)):
    query = (
        select(ChartConfig)
        .filter(ChartConfig.user_id == 2)
    )

    res = await session.execute(query)
    result_orm = res.scalars().one_or_none()
    # return result_orm
    result_dto = ChartConfigDTO.model_validate(result_orm, from_attributes=True)
    return result_dto


@router.put("update_config")
async def update_config(data: ChartConfigSchema, session: AsyncSession = Depends(get_async_session)):

    query = (
        select(ChartConfig)
        .filter(ChartConfig.id == data.id)
    )

    res = await session.execute(query)
    obj = res.scalar_one_or_none()
    if obj is None:
        raise HTTPException(status_code=404, detail="Data not found")

    obj.config = data.config
    await session.commit()

    return {"message": "Data updated successfully"}


