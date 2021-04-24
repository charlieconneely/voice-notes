import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import '../styles/style.css'

const Entry = (props) => {

    const deleteEntryFromProps = (val) => {
        props.deleteEntry(val);
    }

    return(
        <div className="note">
            <p> <b>{props.index + 1}.</b> {props.entry}</p>
            <IconButton onClick={() => deleteEntryFromProps(props.entry)} aria-label="delete">
                <DeleteIcon fontSize="small"/>
            </IconButton>
        </div>
    )
}

export default Entry