import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface OrderState {
    value: Order[]
}
// type OrderState = Order[]

interface Order extends IncompleteOrder {
    id: number,
    status: OrderStatus,
}

interface IncompleteOrder {
    client: string,
    phone: string,
    delivery_date: number,
    delivery_address: string,
    amount: number,
    product_price: number,
    delivery_price: number,
    comment: string,
}

interface OrderStatusCreated {
    value: 'Создан',
    type: 1,
};
interface OrderStatusCancelled {
    value: 'Отменен',
    type: 2,
};
interface OrderStatusFinished {
    value: 'Завершен',
    type: 3,
};
type OrderStatus = OrderStatusCreated | OrderStatusCancelled | OrderStatusFinished

const initialState:OrderState = {
    value:[
        {
            id:1,
            client:"Руслан",
            phone:"7015151151",
            status: {value:'Создан', type: 1},
            delivery_date: new Date().getTime(),
            delivery_address: "г. Москва, ул. Макаёнка, 20",
            amount: 3,
            product_price: 2500,
            delivery_price: 200,
            comment: 'Звоните на номер'
        }
    ]
}


export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state.value = [...state.value, action.payload]
        },
        completeOrder: (state, action: PayloadAction<number>) => {
            state.value = state.value.map((order)=>{
                if (order.id === action.payload) return {...order, status:{value:'Завершен', type:3}};
                return order;
            });
        },
        cancelOrder: (state, action: PayloadAction<number>) => {
            state.value = state.value.map((order)=>{
                if (order.id === action.payload) return {...order, status:{value:'Отменен', type:2}};
                return order;
            });
        },
        createOrder: (state, action: PayloadAction<IncompleteOrder>) => {
            const id = state.value.reduce((maxId, currentId)=>{
                return maxId.id > currentId.id ? maxId : currentId;
            }).id
            state.value.push({...action.payload, status: {value:'Создан', type:1}, id:id+1})
        }
    },
})

export const { addOrder, completeOrder, cancelOrder, createOrder } = orderSlice.actions

export default orderSlice.reducer