import Button, { ButtonProps } from "../Button"



type FormButtonProps = ButtonProps

function FormButton(props: FormButtonProps) {
    return (
        <Button handleClick={props.handleClick} class={props.class}>
            <p>Send email</p>
        </Button>
    )
}

export default FormButton