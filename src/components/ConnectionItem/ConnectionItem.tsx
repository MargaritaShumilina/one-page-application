import {type FC} from 'react';
import './ConnectionItem.css'

type Props = {
    name: string
}

export const ConnectionItem: FC<Props> = ({name}) => {
    return (
        <li className='description-block__connection-item'>
            <input type={"checkbox"} className='description-block__checkbox'/>
            <p className='description-block__text'>{name}</p>
        </li>
    );
};
