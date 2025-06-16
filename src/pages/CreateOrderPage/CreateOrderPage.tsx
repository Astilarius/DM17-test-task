import { useAppDispatch } from "../../store/hooks.ts";
import type { AppDispatch } from "../../store/store.ts";
import { createOrder } from "../../store/slice.ts";
import { Button, Group } from "@chakra-ui/react";
import { useState } from "react";
import './CreateOrderPage.css';
import { useNavigate } from "react-router";
import PhoneNumberInput from "../../components/CreateOrderPage/PhoneNumberInput/PhoneNumberInput.tsx";
import TextAreaInput from "../../components/CreateOrderPage/TextAreaInput/TextAreaInput.tsx";
import AdressInput from "../../components/CreateOrderPage/AdressInput/AdressInput.tsx";
import InputComponent from "../../components/CreateOrderPage/InputComponent/InputComponent.tsx";
import AddProductTable from "../../components/CreateOrderPage/AddProductTable/AddProductTable.tsx";
import ClientSelector from "../../components/CreateOrderPage/ClientSelector/ClientSelector.tsx";

interface Product{
  id: number,
  title: string,
  art: string,
  amount: number,
  price: number,
  comment?: string
}

function CreateOrderPage() {
  let navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  
  const [products, setProducts] = useState<Product[]>([]);

  const [error, setError] = useState(false);
  const [client, setClient] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [comment, setComment] = useState("");

  function editProduct(newProduct:Product){
    setProducts(products=>{
      return products.map((product)=>{
        if (newProduct.id!==product.id) return product;
        return newProduct;
      })
    })
  }


  function setDeliveryDateToday(){
    setDeliveryDate(new Date())
  }
  
  function setDeliveryDateTomorrow(){
    let date = new Date()
    date.setDate(date.getDate() + 1)
    setDeliveryDate(date)
  }
  
  function setDeliveryDate2DaysFromToday(){
    let date = new Date()
    date.setDate(date.getDate() + 2)
    setDeliveryDate(date)
  }

  function confirm(){
    if (client && phone && deliveryDate && deliveryAddress && deliveryPrice) {
      dispatch(createOrder({
        client: client,
        phone: phone,
        delivery_date: deliveryDate,
        delivery_address: deliveryAddress,
        amount: products.reduce((amount,product)=>{return amount+product.amount},0),
        product_price: products.reduce((price,product)=>{return price+product.price},0),
        delivery_price: deliveryPrice,
        comment: comment,
      }));
      setClient('');
      setPhone('');
      setDeliveryDate(new Date());
      setDeliveryAddress('');
      setDeliveryPrice(0);
      setComment('');
      navigate("/")
    } else {
      setError(true)
    }
  }

  return (
      <div className="page-div">
        <h1 className="page-title">Создание заказа</h1>
        <div className="create-order-page">
          <div className="order-data">
            <h3 className="order-data__input-block-title">Данные заказа</h3>            
            <div className="order-data__input-block-container">
              <div className="order-data__input-block">
              <ClientSelector
                setPhone={setPhone}
                setClient={setClient}
                setDeliveryAddress={setDeliveryAddress}
                client={client}
              />
              <PhoneNumberInput
                label="Номер телефона"
                placeholder= "+7 (___) ___-__-__"
                mask= "+7 (999) 999-99-99"
                value={phone}
                setValue={(phone:string)=>{
                  setPhone(phone)
                  setClient('')
                }}
                isRequired={true}
                isError={error&&!phone}
              />
              <TextAreaInput
                label="Комменатрий"
                value={comment}
                setValue={setComment}
                isRequired={true}
                isError={error&&!comment}
              />
              </div>
              <div className="order-data__input-block">
                <h3 className="order-data__input-block-title">Доставка</h3>
                <AdressInput
                  label="Адрес"
                  value={deliveryAddress}
                  setValue={(value:string)=>{
                    setDeliveryAddress(value)
                    setClient('')
                  }}
                  isRequired={true}
                  isError={error&&!deliveryAddress}
                />
                <InputComponent
                  label="Стоимость доставки"
                  value={deliveryPrice}
                  setValue={(value:string)=>{
                    setDeliveryPrice(Number(value.replace(/\D/g, "")))
                  }}
                  endAddon="RUB"
                  isRequired={true}
                  isError={error&&!deliveryPrice}
                />
                <InputComponent
                  label="Дата"
                  value={deliveryDate.toISOString().slice(0, 10)}
                  min={new Date().toISOString().slice(0, 10)}
                  setValue={(value:string)=>{
                    setDeliveryDate(new Date(value))
                  }}
                  type="date"
                  isRequired={false}
                />
                <Group>
                  <Button size="sm" onClick={setDeliveryDateToday}>Сегодня</Button>
                  <Button size="sm" onClick={setDeliveryDateTomorrow}>Завтра</Button>
                  <Button size="sm" onClick={setDeliveryDate2DaysFromToday}>Послезавтра</Button>
                </Group>
              </div>
            </div>            
          </div>
          <div className="order-products">
          <h3 className="order-products__title">Товары к заказу</h3>
          <AddProductTable
            error={error}
            products={products}
            setProducts={(products:Product[])=>{
              setProducts(products)
            }}
            editProduct={(newProduct:Product)=>{
              editProduct(newProduct)
            }}
          />
          <div className="total-price-table">
            <div className="total-price-table__row">
              <span>Сумма</span>
              <span>{products.reduce((totalPrice, currentProduct)=>{
                return totalPrice + currentProduct.price * currentProduct.amount
              },0)}</span>
            </div>
            <div className="total-price-table__row">
              <span>Сумма с доставкой</span>
              <span>{products.reduce((totalPrice, currentProduct)=>{
                return totalPrice + currentProduct.price * currentProduct.amount
              },0) + deliveryPrice}</span>
            </div>
          </div>
            <div className="end-button-block">
              <Button colorPalette={'blue'} onClick={confirm}>Создать</Button>
              <Button colorPalette={'blue'} onClick={()=>navigate("/")}>Отменить</Button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CreateOrderPage