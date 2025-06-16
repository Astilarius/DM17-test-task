import { Table, Input, Field } from "@chakra-ui/react"
import { useState } from "react";

interface AddProductTableProps {
    products: Product[],
    setProducts: Function,
    editProduct: Function,
    error: boolean
}

interface Product{
    id: number,
    title: string,
    art: string,
    amount: number,
    price: number,
    comment?: string
  }

function AddProductTable(props:AddProductTableProps){
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState<number | null>();
    const [productPrice, setProductPrice] = useState<number | null>();
    const [art, setArt] = useState("");
    const [productComment, setProductComment] = useState("");

    function addProductIfFull() {
        if (title && amount && productPrice && art) {
            addProduct()
        }
    }

    function addProduct(){
        if(amount && productPrice) {
            props.setProducts((products:Product[])=>[...products, 
            {
                id:products.length + 1, 
                title: title, 
                art:art, 
                amount: amount, 
                price: productPrice, 
                comment: productComment
            }])
            setTitle('')
            setAmount(0)
            setProductPrice(0)
            setArt('')
            setProductComment('')
        }
    }

    return (
        <Table.Root>
        <Table.ColumnGroup>
          <Table.Column htmlWidth="20px" />
          <Table.Column htmlWidth="260px" />
          <Table.Column htmlWidth="120px" />
          <Table.Column htmlWidth="120px" />
          <Table.Column htmlWidth="100px" />
        </Table.ColumnGroup>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader >№</Table.ColumnHeader>
            <Table.ColumnHeader >НАЗВАНИЕ</Table.ColumnHeader>
            <Table.ColumnHeader >АРТИКУЛ</Table.ColumnHeader>
            <Table.ColumnHeader >КОЛИЧЕСТВО</Table.ColumnHeader>
            <Table.ColumnHeader >ЦЕНА (RUB)</Table.ColumnHeader>
            <Table.ColumnHeader >КОММЕНТАРИЙ</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
      <Table.Body>
        {
          props.products.map((product, index)=>
            <Table.Row key={product.id}>
              <Table.Cell>
                {index+1}
              </Table.Cell>
              <Table.Cell>
                <Input
                  className="order-products__input"
                  value={product.title}
                  onChange={(e)=>{props.editProduct({...product, title:e.currentTarget.value})}}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  className="order-products__input"
                  value={product.art}
                  onChange={(e)=>{props.editProduct({...product, art:e.currentTarget.value.toUpperCase().replace(/[^A-Za-z0-9]/g, "")})}}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  className="order-products__input"
                  value={product.amount}
                  onChange={(e)=>{props.editProduct({...product, amount:Number(e.currentTarget.value.replace(/\D/g, ""))})}}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  className="order-products__input"
                  value={product.price}
                  onChange={(e)=>{props.editProduct({...product, price:Number(e.currentTarget.value.replace(/\D/g, ""))})}}
                />
              </Table.Cell>
              <Table.Cell>
                <Input
                  className="order-products__input"
                  value={product.comment}
                  onChange={(e)=>{props.editProduct({...product, comment:e.currentTarget.value})}}
                />
              </Table.Cell>
            </Table.Row>
          )
        }
        <Table.Row>
          <Table.Cell>{props.products.length + 1}</Table.Cell>
          <Table.Cell>
          <Field.Root invalid={props.error&&!title}>
            <Input
              className={props.error ? "" : "order-products__input"}
              value={title}
              onChange={(e)=>{setTitle(e.currentTarget.value)}}
              onBlur={addProductIfFull}
            />
          </Field.Root>
          </Table.Cell>
          <Table.Cell>
          <Field.Root invalid={props.error&&!art}>
            <Input
              className={props.error ? "" : "order-products__input"}
              value={art}
              onChange={(e)=>{setArt(e.currentTarget.value.toUpperCase().replace(/[^A-Za-z0-9]/g, ""))}}
              onBlur={addProductIfFull}
            />
          </Field.Root>
          </Table.Cell>
          <Table.Cell>
          <Field.Root invalid={props.error&&!amount}>
            <Input
              className={props.error ? "" : "order-products__input"}
              value={amount || ''}
              onChange={(e)=>{setAmount(Number(e.currentTarget.value.replace(/\D/g, "")))}}
              onBlur={addProductIfFull}
            />
          </Field.Root>
          </Table.Cell>
          <Table.Cell>
          <Field.Root invalid={props.error&&!productPrice}>
            <Input
              className={props.error ? "" : "order-products__input"}
              value={productPrice || ''}
              onChange={(e)=>{setProductPrice(Number(e.currentTarget.value.replace(/\D/g, "")))}}
              onBlur={addProductIfFull}
            />
          </Field.Root>
          </Table.Cell>
          <Table.Cell>
            <Input
              className="order-products__input"
              value={productComment}
              onChange={(e)=>{setProductComment(e.currentTarget.value)}}
            />
          </Table.Cell>
        </Table.Row>
        {
          title || amount || productPrice || art || productComment ?
            <Table.Row>
              <Table.Cell>{props.products.length + 2}</Table.Cell>
              <Table.Cell colSpan={5} className="order-products__fill-data-message">
                Заполните данные по товару
              </Table.Cell>
            </Table.Row> : ''
        }
      </Table.Body>
    </Table.Root>
    )
}

export default AddProductTable