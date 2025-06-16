import { Select } from "@chakra-ui/react"
import { clients } from '../../../store/clients.ts';
import { createListCollection, Portal } from "@chakra-ui/react"

interface ClientSelectorProps {
    setPhone: Function,
    setClient: Function
    setDeliveryAddress: Function,
    client: string
}

function ClientSelector(props:ClientSelectorProps) {
    const clientsList = createListCollection({
        items: clients.map(client=>{ return {...client, label:client.name, value:client.name} })
    })

    return (
    <Select.Root collection={clientsList}>
    <Select.HiddenSelect />
    <Select.Label>Постоянный клиент</Select.Label>
    <Select.Control>
        <Select.Trigger>
        <Select.ValueText children={<div>{props.client}</div>}/>
        </Select.Trigger>
        <Select.IndicatorGroup>
        <Select.ClearTrigger onClick={()=>{props.setClient('')}} />
        <Select.Indicator />
        </Select.IndicatorGroup>
    </Select.Control>
    <Portal>
        <Select.Positioner>
        <Select.Content>
            {clientsList.items.map((client) => (
                <Select.Item item={client.name} key={client.id} onClick={()=>{
                    props.setClient(client.name)
                    props.setDeliveryAddress(client.address)
                    props.setPhone(client.phone)
                }}>
                    {client.name}
                    <Select.ItemIndicator />
                </Select.Item>
            ))}
        </Select.Content>
        </Select.Positioner>
    </Portal>
    </Select.Root>
    )
}

export default ClientSelector