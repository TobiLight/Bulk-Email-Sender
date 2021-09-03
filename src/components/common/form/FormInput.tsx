import { IFormInput } from '../Input'
import Input from '../Input'


function FormInput(props: IFormInput) {
    return (
        <Input handleChange={props.handleChange} name={props.name} value={props.value} type={props.type} class={props.class} placeholder={props.placeholder} />
    )
}

export default FormInput