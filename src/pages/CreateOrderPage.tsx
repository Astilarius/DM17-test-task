import { useAppDispatch } from "../store/hooks";
import type { AppDispatch } from "../store/store";
import { createOrder } from "../store/slice";
import { Button, Input } from "@chakra-ui/react"
import { useState } from "react";
import OrderTable from "../components/IndexPage/OrderTable";

function CreateOrderPage() {
  const dispatch: AppDispatch = useAppDispatch();
  
  const [client, setClient] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [comment, setComment] = useState("");

  function confirm(){
    dispatch(createOrder({
      client: client,
      phone: phone,
      delivery_date: deliveryDate,
      delivery_address: deliveryAddress,
      amount: amount,
      product_price: productPrice,
      delivery_price: deliveryPrice,
      comment: comment,
    }));
    setClient('');
    setPhone('');
    setDeliveryDate('');
    setDeliveryAddress('');
    setAmount(0);
    setProductPrice(0);
    setDeliveryPrice(0);
    setComment('');
  }

    return (
        <div>
          <Input
            value={client}
            onChange={(e) => {
              setClient(e.currentTarget.value)
            }}
          />
          <Input
            value={phone}
            onChange={(e) => {
              setPhone(e.currentTarget.value)
            }}
          />
          <Input
            value={deliveryDate}
            onChange={(e) => {
              setDeliveryDate(e.currentTarget.value)
            }}
          />
          <Input
            value={deliveryAddress}
            onChange={(e) => {
              setDeliveryAddress(e.currentTarget.value)
            }}
          />
          <Input
            value={amount}
            onChange={(e) => {
              setAmount(Number(e.currentTarget.value.replace(/\D/g, "")))
            }}
          />
          <Input
            value={productPrice}
            onChange={(e) => {
              setProductPrice(Number(e.currentTarget.value.replace(/\D/g, "")))
            }}
          />
          <Input
            value={deliveryPrice}
            onChange={(e) => {
              setDeliveryPrice(Number(e.currentTarget.value.replace(/\D/g, "")))
            }}
          />
          <Input
            value={comment}
            onChange={(e) => {
              setComment(e.currentTarget.value)
            }}
          />
          <Button colorPalette={'blue'} onClick={confirm}>confirm</Button>
          <OrderTable/>
        </div>
      )
}

export default CreateOrderPage