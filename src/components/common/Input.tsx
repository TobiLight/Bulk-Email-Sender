
export interface IFormInput {
    name: string,
    value: string,
    type: string,
    class: string,
    placeholder: string
    handleChange?(e: React.ChangeEvent<HTMLInputElement>): void
}



function Input(props: IFormInput) {
    return (
        <input value={props.value} type={props.type} className={props.class} placeholder={props.placeholder} name={props.name} />
    )
}



export default Input