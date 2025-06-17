import { Button, Field, Group, Icon, Input } from "@chakra-ui/react"
import CopyIcon from  '../../../assets/FiCopy.svg'
import type {InputComponentProps} from '../InputComponent/InputComponent.tsx'
import {token} from '../../../token.ts'
import './AdressInput.css'

// interface Suggestion {
//     value: string
// }

function AdressInput(props:InputComponentProps) {
    function inputAdress(e:React.ChangeEvent<HTMLInputElement>) {
        props.setValue(e.currentTarget.value)
        const apiUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address ';
        const data = {
          "query": e.currentTarget.value,
          "count": 5,
        };
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "Authorization": `Token ${token}`
          },
          body: JSON.stringify(data),
        };
        fetch(apiUrl, requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
      }

    return (
    <Field.Root invalid={props.isError&&props.isRequired} required={props.isRequired} className="order-data__input-field-group">
    <Field.Label className="order-data__input-field-title">
        {props.label}
    </Field.Label>
    <Group className="order-data__input-field">
        <Input
        value={props.value}
        onChange={(e)=>inputAdress(e)}
        />
        {/* {suggestions.map(suggestion=>
        <Menu.Item key={suggestion.value} value={suggestion.value}>{suggestion.value}</Menu.Item>
        )} */}
        <Button
            colorPalette={'blue'} 
            variant={'outline'} 
            className="order-data__copy-button" 
            onClick={()=>{
                navigator.clipboard.writeText(String(props.value))
            }}
        >
        <Icon>
            <img src={CopyIcon}/>
        </Icon>
        </Button>
    </Group>
    </Field.Root>)
}

export default AdressInput