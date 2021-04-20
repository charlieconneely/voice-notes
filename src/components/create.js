import { React, useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Button } from '@material-ui/core'
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice'
import Note from './note'
import '../styles/style.css'

const Create = (props) => {

    const [isListening, setIsListening] = useState(false);
    const [notes, setNotes] = useState([]);
    const [storedNotes, setStoredNotes] = useLocalStorage("notes", []);

    const listenButtonText = isListening ? 'Stop Listening' : 'Start Listening'

    const commands = [
        {
            command: ["Don't forget *", "Remember *"],
            callback: (note) => {isListening ? setNotes([...notes, `${note}`]) : alert('Not listening')}
        },
        {
            command: "Stop listening",
            callback: () => setIsListening(false) 
        },
        {
            command: "Start listening",
            callback: () => setIsListening(true) 
        }
    ]

    const { transcript, resetTranscript } = useSpeechRecognition({ commands });

    useEffect(() => {
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            alert("Your browser is not supported!");
        } else {
            SpeechRecognition.startListening({ continuous: true }) 
        }
    }, [])
    
    useEffect(() => {
        console.log('changed')
    }, [notes]) 

    function backToHome() {
        props.history.push('/');
    }

    /* Called from Button onclick */ 
    function changeIsListening() {
        setIsListening(!isListening)
    }   

    function undo() {
        /* Retrieve last item from list and remove it */
        let lastItem = notes.pop();
        setNotes(notes.filter(note => note !== lastItem));
    }

    function save() {
        setStoredNotes([...storedNotes, ...notes])
        setNotes([])
    }

    const deleteNote = (val) => {
        setNotes(notes.filter(note => note !== val));
    }

    var notesArr = [...notes];
    return (
        <div className="container">
            <div className="controls">
                <p>{transcript ? transcript : '...'}</p>
            </div>
            <div className="controls">
                <h3>Notes: </h3> 
            </div>  
        
            {notesArr.map(note => <Note deleteNote={deleteNote} note={note}/>)}

            <div className="controls">
                <Button onClick={undo} variant='outlined' size='small'>Undo</Button>
                <Button onClick={resetTranscript} variant='outlined' size='small'>Reset</Button>
                <Button onClick={save} variant='outlined' size='small'>Save All</Button>
            </div>
            <div className="option">
                <Button onClick={changeIsListening} variant='outlined' startIcon={<KeyboardVoiceIcon />}
                        color={isListening ? 'secondary' : 'primary'} size='medium'>{listenButtonText}</Button>
            </div>
            <div className="option">
                <Button onClick={backToHome} variant='outlined' size='small'>Back</Button>
            </div>
        </div>
    )
}

export default Create