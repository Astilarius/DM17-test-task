import { Button } from "@chakra-ui/react"
import OrderTable from "../../components/IndexPage/OrderTable"
import { useNavigate } from "react-router";
import './IndexPage.css'


function IndexPage() {
  let navigate = useNavigate();
  return (
    <div className="page-div">
      <div className="index-page__title-line">
        <h1 className="page-title">Заказы</h1>
        <Button className="button-primary" onClick={()=>navigate("/create")}>Добавить заказ</Button>
      </div>
      <OrderTable/>
    </div>
    )
}

export default IndexPage