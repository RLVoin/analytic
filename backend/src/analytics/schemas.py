from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict


class NewData(BaseModel):
    departament_id: int
    direction_id: int
    year: int
    values: dict[str, int]


class DirectionDTO(BaseModel):
    id: int
    direction: str


class DepartamentDTO(BaseModel):
    id: int
    departament: str


class DataDTO(BaseModel):
    id: int
    year: int
    month: int
    value: int
    direction: DirectionDTO
    departament: DepartamentDTO


class DataWithoutJoinDTO(BaseModel):
    id: int
    year: int
    month: int
    value: int
    direction_id: int
    departament_id: int


class AnalyticDTO(DirectionDTO, DepartamentDTO):
    id: int
    title: str
    direction: list["DirectionDTO"]


class DataWithTableId(BaseModel):
    table_id: int = None
    direction_id: int = None
    departament_id: int = None


class ChartConfigSchema(BaseModel):
    id: int
    config: list


class ChartConfigDTO(ChartConfigSchema):
    user_id: int


