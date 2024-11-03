import React, {FC} from "react";
import './Description.css'
import {connections, properties, tHeadProperties} from "../../utils/constants";
import {Table} from "../Table/Table";
import {ConnectionItems} from "../ConnectionItems/ConnectionItems";

type Props = {
    text:string | undefined;
    style: string;
}
const Description:FC<Props> = ({text, style}) => {
    return (
        <div className='description-block__description'>
            <h2 className={`${style} description-block__heading`}>Описание</h2>
            <div className='description-block__description-text-block'>
                <p className='description-block__description-text'>{text}</p>
            </div>
            <h2 className={`${style} description-block__heading`}>Свойства</h2>
            <div className="data-table-container">
               <Table tBodyData={properties} tHeadData={tHeadProperties}/>
            </div>
            <h2 className={`${style} description-block__heading`}>Связи</h2>
            <ConnectionItems data={connections} />
        </div>
    )
}
export default Description;
