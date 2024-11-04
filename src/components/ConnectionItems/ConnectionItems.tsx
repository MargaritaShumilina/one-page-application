import './ConnectionItems.css'
import {FC} from "react";
import {ConnectionItem} from "../ConnectionItem/ConnectionItem";

type Props = {
    data: string[]
}

export const ConnectionItems:FC<Props> = ({data}) => {
    return (
        <>
            <div className='description-block__items-heading-block'>
                <input type={"checkbox"} className='description-block__checkbox'/><h3 className='description-block__items-heading'>Название класса</h3></div>
                <ul className='description-block__items-connection'>
                    {
                        data.map(item => <ConnectionItem key={item} name={item}/>)
                    }
                </ul>
        </>
    );
};
