import { completeOrder, cancelOrder } from "../../store/slice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import type { AppDispatch } from "../../store/store";
import { Table } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"
import './OrderTable.css'

function OrderTable() {
  const orders = useAppSelector(state => state.orders);
  const dispatch: AppDispatch = useAppDispatch();

  return (
      <Table.Root className="show-orders__table">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader >№</Table.ColumnHeader>
            <Table.ColumnHeader >КЛИЕНТ</Table.ColumnHeader>
            <Table.ColumnHeader >НОМЕР ТЕЛЕФОНА</Table.ColumnHeader>
            <Table.ColumnHeader >СТАТУС</Table.ColumnHeader>
            <Table.ColumnHeader >ДАТА ДОСТАВКИ</Table.ColumnHeader>
            <Table.ColumnHeader >АДРЕС ДОСТАВКИ</Table.ColumnHeader>
            <Table.ColumnHeader >КОЛ-ВО</Table.ColumnHeader>
            <Table.ColumnHeader >СТОИМОСТЬ ТОВАРОВ (RUB)</Table.ColumnHeader>
            <Table.ColumnHeader >СТОИМОСТЬ ДОСТАВКИ (RUB)</Table.ColumnHeader>
            <Table.ColumnHeader >СТОИМОСТЬ ИТОГО (RUB)</Table.ColumnHeader>
            <Table.ColumnHeader >КОММЕНТАРИЙ</Table.ColumnHeader>
            <Table.ColumnHeader >ДЕЙСТВИЯ</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
      <Table.Body>
        { orders.map((order, index)=>
        <Table.Row key={order.id}>
          <Table.Cell>{index+1}</Table.Cell>
          <Table.Cell>{order.client}</Table.Cell>
          <Table.Cell>{order.phone}</Table.Cell>
          <Table.Cell><div className={`show-orders__status show-orders__status-${order.status.type}`}>{order.status.value}</div></Table.Cell>
          <Table.Cell>{`${String(order.delivery_date.getDay()).padStart(2, "0")}.${String(order.delivery_date.getMonth()).padStart(2, "0")}.${String(order.delivery_date.getFullYear()).padStart(2, "0")}`}</Table.Cell>
          <Table.Cell>{order.delivery_address}</Table.Cell>
          <Table.Cell>{order.amount}</Table.Cell>
          <Table.Cell>{order.product_price}</Table.Cell>
          <Table.Cell>{order.delivery_price}</Table.Cell>
          <Table.Cell>{order.product_price + order.delivery_price}</Table.Cell>
          <Table.Cell>{order.comment}</Table.Cell>
          {
            order.status.type === 1 ? 
            <Table.Cell>
              <ButtonGroup>
                <Button className="button-secondary" colorPalette={'blue'} onClick={()=>dispatch(cancelOrder(order.id))}>Отменить</Button>
                <Button className="button-primary" colorPalette={'blue'} onClick={()=>dispatch(completeOrder(order.id))}>Завершить</Button>
              </ButtonGroup>
            </Table.Cell> : ''
          }
        </Table.Row>
        ) }
      </Table.Body>
    </Table.Root>
  )
}

export default OrderTable