import { React } from 'react'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import '../styles/style.css'

const Note = (props) => {

    const deleteNoteFromProps = () => {
        props.deleteNote(props.note);
    }

    return(
        <div className="note">
            <p>{props.note}</p>
            <IconButton onClick={deleteNoteFromProps} aria-label="delete" >
                <DeleteIcon fontSize="small" />
            </IconButton>
        </div>
    )
}

export default Note