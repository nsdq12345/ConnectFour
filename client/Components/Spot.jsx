import React from 'react';

function Spot(props) {
    return <span onClick={(e) => props.boardClick(e)} id={props.id} style={{border: '1px solid black'}}>
            {props.piece === '' ? <>&nbsp;&nbsp;&nbsp;</> : <>&nbsp;{props.piece}&nbsp;</>}
        </span>
}

export default Spot;