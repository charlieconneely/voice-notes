import { React, useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import Note from './note'
import '../styles/style.css'

const Notes = (props) => {

    const [storedNotes, setStoredNotes] = useState([])

    const commands = [
        { 
            command: ['Go back', 'Back'],
            callback: () => backToHome() 
        },
        {
            command: ['Delete number *'],
            callback: (index) => console.log('index: ' + index)
        }
    ]
    
    useSpeechRecognition({ commands });

    useEffect(() => {
        SpeechRecognition.startListening({ continuous: true })
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

    const backToHome = () => {
        props.history.push('/');
    }

    let notesArr = [...storedNotes];
    return (
        <div className="container">
            <div className="heading">
                <h3>Remember...</h3>
            </div>

            {notesArr.map( (note, index) => 
                <Note key={note} deleteNote={deleteNote} index={index} note={note}/> 
            )} 

            <div className="note">
                <Button onClick={backToHome} variant='outlined' size='small'>Back</Button>
            </div>
        </div>
    )

}

export default Notes