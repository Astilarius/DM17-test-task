import { Field, Input } from "@chakra-ui/react"
import { withMask } from "use-mask-input"

export interface PhoneNumberInputProps {
    label: string,
    placeholder: string,
    mask: string,
    phone: string,
    setPhone: Function,
    isRequired: boolean,
}

function PhoneNumberInput(props:PhoneNumberInputProps) {
    return (
    <Field.Root required={props.isRequired} className="order-data__input-field-group">
        <Field.Label className="order-data__input-field-title">
            {props.label}
        </Field.Label>
        <Input
            placeholder={props.placeholder}
            ref={withMask(props.mask)}
            value={props.phone}
            onChange={(e) => {
                props.setPhone(e.currentTarget.value)
            }}
        />
    </Field.Root>)
}

export default PhoneNumberInput