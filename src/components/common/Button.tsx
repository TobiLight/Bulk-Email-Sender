import React from 'react'


export interface ButtonProps {
    children?: object
    class: string,
    handleClick: React.MouseEventHandler<HTMLButtonElement>
}

function Button(props: ButtonProps) {
    return (
        <button onClick={props.handleClick} className={props.class}>{props.children}</button>
    )
}

export default Button