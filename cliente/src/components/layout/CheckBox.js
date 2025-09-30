import React  from 'react';

export default function CheckBox({handleChangeCheck, row, id, checkedId, check}) {

    const handleChange = (event) => {
        handleChangeCheck(event, row, id);
    }

    return (
        <div>
            <input
                type="checkbox"
                checked={checkedId === id && check}
                onChange= {(event)=>handleChange(event)} 
                id="cbox2" />
        </div>
    )
}
