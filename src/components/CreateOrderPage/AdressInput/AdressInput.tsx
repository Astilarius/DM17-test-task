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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z" stroke="#313B9B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5" stroke="#313B9B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </Button>
      </Group>
  </Field.Root>)
}

export default AdressInput