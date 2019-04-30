
import asyncio
from xknx import XKNX
from xknx.io import GatewayScanner

async def main():

    xknx = XKNX()

    # Recherche des gateways

    gatewayscanner = GatewayScanner(xknx)
    gateways = await gatewayscanner.scan()

    if not gateways:
        print("none")
        return

    gateway = gateways[0]
    print(gateway)

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
loop.close()