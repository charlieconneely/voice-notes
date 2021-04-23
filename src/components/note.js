import { React } from 'react'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import '../styles/style.css'

const Note = (props) => {

    const deleteNoteFromProps = (val) => {
        props.deleteNote(val);
    }

    return(
        <div className="note">
            <p> <b>{props.index + 1}.</b> {props.note}</p>
            <IconButton onClick={() => deleteNoteFromProps(props.note)} aria-label="delete">
                <DeleteIcon fontSize="small"/>
            </IconButton>
        </div>
    )

}

export default Note