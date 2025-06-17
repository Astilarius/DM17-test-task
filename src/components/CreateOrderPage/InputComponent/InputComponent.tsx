import { Field, Input, InputGroup } from "@chakra-ui/react"
import './InputComponent.css'

export interface InputComponentProps {
    label: string,
    value: string | number,
    setValue: Function,
    isRequired: boolean,
    endAddon?: string,
    min?: string | number,
    type?: string
    isError?: boolean
}

function InputComponent(props:InputComponentProps) {
    return (
    <Field.Root invalid={props.isError&&props.isRequired} required={props.isRequired} className="order-data__input-field-group">
        <Field.Label className="order-data__input-field-title">
            {props.label}
        </Field.Label>
        <InputGroup className="order-data__input-group" endAddon={props.endAddon}>
            <Input
                className="order-data__input"
                type={props.type}
                value={props.value}
                onChange={(e) => {
                    props.setValue(e.currentTarget.value)
                }}
                min={props.min}
            />
        </InputGroup>
    </Field.Root>)
}

export default InputComponent