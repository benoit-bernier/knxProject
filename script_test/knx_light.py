
import asyncio
from xknx import XKNX
from xknx.io import GatewayScanner, Tunnel
from xknx.knx import PhysicalAddress
from xknx.devices import Light

async def main():

    xknx = XKNX()

    # Recherche des gateways

    gatewayscanner = GatewayScanner(xknx)
    gateways = await gatewayscanner.scan()

    if not gateways:
        print("No Gateways found")
        return

    gateway = gateways[0]
    print(gateway)

    src_address = PhysicalAddress("15.15.249")

    #Connexion à la gateway

    print("Connecting to {}:{} from {}".format(
        gateway.ip_addr,
        gateway.port,
        gateway.local_ip))

    tunnel = Tunnel(
        xknx,
        src_address,
        local_ip=gateway.local_ip,
        gateway_ip=gateway.ip_addr,
        gateway_port=gateway.port)

    await tunnel.connect_udp()
    await tunnel.connect()

    # Allumer la LED

    light = Light(xknx,
                  name='HelloWorldLight',
                  group_address_switch='0/1/1')
    await light.set_on()
    await asyncio.sleep(2)
    await light.set_off()

    #Accès à l'état de la lampe (à revoir mauvaise adresse 0/1/4)
    #print(light.state)
    #print(light.supports_dimming)
    #print(light.brightness)


    # Requesting current state via KNX GROUP WRITE
    #await light.sync()

    # Couper la connexion

    await tunnel.connectionstate()
    await tunnel.disconnect()

# pylint: disable=invalid-name
loop = asyncio.get_event_loop()
loop.run_until_complete(main())
loop.close()
