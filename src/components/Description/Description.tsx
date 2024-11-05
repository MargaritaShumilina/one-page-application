import React, {type FC} from 'react';
import './Description.css'
import {connections, properties, tHeadProperties} from '../../utils/constants';
import {ConnectionItems} from '../ConnectionItems/ConnectionItems';
import {Table} from '../Table/Table';

type Props = {
    text:string | undefined;
    style: string;
}
const Description:FC<Props> = ({text, style}) => {
    return (
        <div className='description-block__units'>
            <h2 className={`${style} description-block__heading description-block__heading-description`}>Описание</h2>
            <div className='description-block__description-text-block'>
                <p className='description-block__description-text'>{text}</p>
            </div>
            <h2 className={`${style} description-block__heading description-block__properties`}>Свойства</h2>
            <div className="description-block__table">
               <Table tBodyData={properties} tHeadData={tHeadProperties}/>
            </div>
            <h2 className={`${style} description-block__heading description-block__connections`}>Связи</h2>
            <ConnectionItems data={connections} />
        </div>
    )
}
export default Description;
