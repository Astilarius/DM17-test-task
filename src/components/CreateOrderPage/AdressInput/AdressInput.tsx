import { Button, Field, Group, Icon, Input } from "@chakra-ui/react"
import CopyIcon from  '../../../assets/FiCopy.svg'
import { Tooltip } from "../../ui/tooltip"
import type {InputComponentProps} from '../InputComponent/InputComponent.tsx'
import {token} from '../../../token.ts'
import './AdressInput.css'
import { useState } from "react"

interface Suggestion {
  value: string,
}

function AdressInput(props:InputComponentProps) {
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  
  function inputAdress(e:React.ChangeEvent<HTMLInputElement>) {
    setOpen(value=>!value)
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
      .then(result => {
        setSuggestions(result.suggestions)
        console.log(result.suggestions)
      })
  }

  function openTooltip(){
    if (suggestions.length > 0) {
      setOpen(true)
    }
  }

  return (
  <Field.Root invalid={props.isError&&props.isRequired} required={props.isRequired} className="order-data__input-field-group">
    <Field.Label className="order-data__input-field-title">
        {props.label}
    </Field.Label>
    <Group className="order-data__input-field">
      <Tooltip open={open} content=
      {<div className="order-data__adress-input-tooltip">
        {suggestions.map(suggestion=>
          <Button className="order-data__adress-input-tooltip-button" key={suggestion.value} onClick={()=>props.setValue(suggestion.value)}>{suggestion.value}</Button>
        )}
      </div>}
        >
        <Input
          onBlur={()=>setOpen(false)}
          onFocus={openTooltip}
          onPointerEnter={openTooltip}

          value={props.value}
          onChange={(e)=>inputAdress(e)}
        />
      </Tooltip>
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