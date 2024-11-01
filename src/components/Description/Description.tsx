import React, {FC} from "react";

type Props = {
    text:string
}
const Description:FC<Props> = ({text}) => {
    return (
        <div>{text}</div>
    )
}
export default Description;
