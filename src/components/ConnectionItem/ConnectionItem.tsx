import {FC} from "react";
import './ConnectionItem.css'

type Props = {
    name: string
}

export const ConnectionItem: FC<Props> = ({name}) => {
    return (
        <li className='description-block__connection-item'>
            <input type={"checkbox"}/>
            <p>{name}</p>
        </li>
    );
};
