import { Field, Textarea } from "@chakra-ui/react"
import type {InputComponentProps} from '../InputComponent/InputComponent.tsx'

function TextAreaInput(props:InputComponentProps) {
    return (
    <Field.Root required={props.isRequired} className="order-data__input-field-group">
        <Field.Label className="order-data__input-field-title">
            {props.label}
        </Field.Label>
        <Textarea
            resize="none"
            value={props.value}
            onChange={(e) => {
                props.setValue(e.currentTarget.value)
            }}
        />
    </Field.Root>
    )
}

export default TextAreaInput