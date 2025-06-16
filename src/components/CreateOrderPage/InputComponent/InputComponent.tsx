import { Field, Input, InputGroup } from "@chakra-ui/react"

export interface InputComponentProps {
    label: string,
    value: string | number,
    setValue: Function,
    isRequired: boolean,
    endAddon?: string,
    min?: string | number,
    type?: string
    isValid?: boolean
}

function InputComponent(props:InputComponentProps) {
    return (
    <Field.Root invalid={props.isValid} required={props.isRequired} className="order-data__input-field-group">
        <Field.Label className="order-data__input-field-title">
            {props.label}
        </Field.Label>
        <InputGroup endAddon={props.endAddon}>
            <Input
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