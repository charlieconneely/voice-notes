import { React, useEffect, useState } from 'react'
import Note from './note'
import { Button } from '@material-ui/core'
import '../styles/style.css'

const Notes = (props) => {

    const [storedNotes, setStoredNotes] = useState([])

    useEffect(() => {
        let notes = JSON.parse(localStorage.getItem('notes'));
        setStoredNotes([...notes])
    }, [])  

    /* called from Note child component */
    const deleteNote = (val) => {
        let notesArr = JSON.parse(localStorage.getItem('notes'))
        notesArr = notesArr.filter(note => note !== val)
        localStorage.setItem('notes', JSON.stringify(notesArr))
        setStoredNotes([...notesArr])
    }

    function backToHome() {
        props.history.push('/');
    }

    let notesArr = [...storedNotes];
    return (
        <div className="container">
            <div className="heading">
                <h3>Remember...</h3>
            </div>

            {notesArr.map(note => <Note deleteNote={deleteNote} note={note}/> )} 

            <div className="note">
                <Button onClick={backToHome} variant='outlined' size='small'>Back</Button>
            </div>
        </div>
    )
}

export default Notes