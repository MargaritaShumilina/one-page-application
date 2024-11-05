import React, {type FC} from 'react';

type Props = {
    onClick: () => void,
    style: string,
    text: string
}
const Button:FC<Props> = ({ onClick, style, text}) => {
    return (
        <button onClick={onClick} className={style}>{text}</button>
    )
}
export default Button;
