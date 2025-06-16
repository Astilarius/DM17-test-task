import { Field, Input } from "@chakra-ui/react"
import { withMask } from "use-mask-input"
import type {InputComponentProps} from '../InputComponent/InputComponent.tsx'

export interface PhoneNumberInputProps extends InputComponentProps {
    placeholder: string,
    mask: string,
}

function PhoneNumberInput(props:PhoneNumberInputProps) {
    return (
    <Field.Root invalid={props.isError&&props.isRequired} required={props.isRequired} className="order-data__input-field-group">
        <Field.Label className="order-data__input-field-title">
            {props.label}
        </Field.Label>
        <Input
            placeholder={props.placeholder}
            ref={withMask(props.mask)}
            value={props.value}
            onChange={(e) => {
                props.setValue(e.currentTarget.value)
            }}
        />
    </Field.Root>)
}

export default PhoneNumberInput