import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

type OrderState = Order[]

interface Order {
    id: number,
    client: string,
    phone: string,
    status: OrderStatus,
    delivery_date: string,
    delivery_address: string,
    amount: number,
    product_price: number,
    delivery_price: number,
    comment: string,
}

interface IncompleteOrder {
    client: string,
    phone: string,
    delivery_date: string,
    delivery_address: string,
    amount: number,
    product_price: number,
    delivery_price: number,
    comment: string,
}

type OrderStatus = 'Создан' | 'Завершен' | 'Отменен';

const initialState:OrderState = [
    {
        id:1,
        client:"Руслан",
        phone:"7015151151",
        status: 'Создан',
        delivery_date: "22.10.2022",
        delivery_address: "г. Москва, ул. Макаёнка, 20",
        amount: 3,
        product_price: 2500,
        delivery_price: 200,
        comment: 'Звоните на номер'
    }
]


export const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action: PayloadAction<Order>) => {
            state = [...state, action.payload]
        },
        completeOrder: (state, action: PayloadAction<number>) => {
            return state.map((order)=>{
                if (order.id === action.payload) return {...order, status:'Завершен'};
                return order;
            });
        },
        cancelOrder: (state, action: PayloadAction<number>) => {
            return state.map((order)=>{
                if (order.id === action.payload) return {...order, status:'Отменен'};
                return order;
            });
        },
        createOrder: (state, action: PayloadAction<IncompleteOrder>) => {
            const id = state.reduce((maxId, currentId)=>{
                return maxId.id > currentId.id ? maxId : currentId;
            }).id
            state.push({...action.payload, status: 'Создан', id:id+1})
        }
    },
})

export const { addOrder, completeOrder, cancelOrder, createOrder } = orderSlice.actions

export default orderSlice.reducer