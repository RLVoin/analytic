from datetime import datetime

from sqlalchemy import (
    TIMESTAMP,
    CheckConstraint,
    Column,
    Enum,
    ForeignKey,
    Index,
    Integer,
    MetaData,
    PrimaryKeyConstraint,
    String,
    Table,
    text, Date, Double, JSON, ARRAY,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.auth.models import role
from src.database import Base


# Test table
class AnalyticOrm(Base):
    __tablename__ = "analytic_data"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str]
    uv: Mapped[float]
    pv: Mapped[float]
    date: Mapped[datetime]


# Table with departments
class DepartamentOrm(Base):
    __tablename__ = "departament"

    id: Mapped[int] = mapped_column(primary_key=True)
    departament: Mapped[str]

    dataDepartament: Mapped[list["DataOrm"]] = relationship(
        back_populates="departament"
    )


# Table with directions
class DirectionOrm(Base):
    __tablename__ = "direction"

    id: Mapped[int] = mapped_column(primary_key=True)
    direction: Mapped[str]

    dataDirection: Mapped[list["DataOrm"]] = relationship(
        back_populates="direction"
    )


# Table with different tables
class TableOrm(Base):
    __tablename__ = "table"

    id: Mapped[int] = mapped_column(primary_key=True)
    table: Mapped[str]

    dataTable: Mapped[list["DataOrm"]] = relationship(
        back_populates="table"
    )


# Table with data from SQDSM
class DataOrm(Base):
    __tablename__ = "data"

    id: Mapped[int] = mapped_column(primary_key=True)
    value: Mapped[int]
    month: Mapped[int]
    year: Mapped[int]
    departament_id: Mapped[int] = mapped_column(ForeignKey("departament.id"))
    direction_id: Mapped[int] = mapped_column(ForeignKey("direction.id"))
    table_id: Mapped[int] = mapped_column(ForeignKey("table.id"), nullable=True)

    direction: Mapped["DirectionOrm"] = relationship(
        back_populates="dataDirection"
    )

    departament: Mapped["DepartamentOrm"] = relationship(
        back_populates="dataDepartament"
    )

    table: Mapped["TableOrm"] = relationship(
        back_populates="dataTable"
    )


# Configuration charts table
class ChartConfig(Base):
    __tablename__ = "chart_config"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    config = Column(JSON)



# class Employer(Base):
#     __tablename__ = "employer"
#
#     id: Mapped[int] = mapped_column(primary_key=True)
#     employer: Mapped[str] = mapped_column(nullable=False)
#
#
# class EmployerStat(Base):
#     __tablename__ = "employer_stat"
#
#     id: Mapped[int] = mapped_column(primary_key=True)
#     employer_id = mapped_column(ForeignKey("employer.id"), nullable=False)
#     target: Mapped[int]
#     value: Mapped[int]
#
#     @property
#     def precent(self) -> float:
#         if self.target == 0:
#             return 0.0
#         return (self.value / self.target) * 100
