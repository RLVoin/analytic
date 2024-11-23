from fastapi import APIRouter

router = APIRouter(
    prefix="/crypyocurrnies"
)


@router.get("")
async def get_cryptocurrencies():
    ...


@router.get("/{currency_id}")
async def get_cryptocurrencies(currency_id: int):
    ...