import { React, useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Button } from '@material-ui/core'
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice'

import Note from './note'
import '../styles/style.css'

function formattedDate() {
    let d = new Date();
    let month = '' + (d.getMonth() + 1);
    let day = '' + (d.getUTCDate());

    /* DD/MM */
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [day, month, d.getFullYear()].join('-');
}

const Create = (props) => {

    const [isListening, setIsListening] = useState(false);
    const [notes, setNotes] = useState([]);
    const [diaryEntry, setDiaryEntry] = useState('');
    const [storedNotes, setStoredNotes] = useLocalStorage("notes", []);
    const [storedEntries, setStoredEntries] = useLocalStorage("entries", []);
    const listenButtonText = isListening ? '"Stop Listening"' : '"Start Listening"'

    const commands = [
        {
            command: ["Don't forget *", "Remember *"],
            callback: (note) => {isListening ? setNotes([...notes, `${note}`]) : alert('Not listening.')}
        },
        {
            command: 'Dear diary *',
            callback: (entry) => {isListening ? setDiaryEntry(entry) : alert('Not listening.')}
        },
        {
            command: ["Stop listening", "Stop recording"],
            callback: () => setIsListening(false)
        },
        {
            command: ["Start listening", "Start recording"],
            callback: () => setIsListening(true)
        },
        {
            command: ["Reset transcript", "Reset the transcript", "Clear transcript", "Clear the transcript", "Reset"],
            callback: () => resetTranscript()
        },
        {
            command: ["Undo"],
            callback: () => undo()
        },
        {
            command: "Save *",
            callback: (field) => {
                if (field === 'all') {
                    saveAll();
                } else if(field === 'notes') {
                    saveNotes();
                } else if(field === 'entry'){
                    saveEntries();
                }
            }
        },
        {
            command: ["Go back", "Back"],
            callback: () => backToHome()
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

    const backToHome = () => {
        props.history.push('/');
    }

    const undo = () => {
        /* Retrieve last item from list and remove it */
        let lastItem = notes.pop();
        setNotes(notes.filter(note => note !== lastItem));
    }

    const saveNotes = () => {
        /* Save on localStorage */
        setStoredNotes([...storedNotes, ...notes])
        setNotes([])
    }

    const saveEntries = () => {
        let entryWithDate = formattedDate() + ': ' + diaryEntry;
        /* Save on localStorage */
        setStoredEntries([...storedEntries, entryWithDate]);
        setDiaryEntry('');
    }

    const saveAll = () => {
        saveEntries()
        saveNotes()
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

            <div className="rows">
                <div className="row">
                    <h3>Things to Remember:</h3>
                    {notesArr.map((note, index) =>
                        <Note key={note} deleteNote={deleteNote} note={note} index={index}/>
                    )}
                    <p>{notes.length === 0 ? '...' : ''}</p>
                    <Button onClick={saveNotes} variant='outlined' size='small'>"Save Notes"</Button>
                </div>
                <div className="row">
                    <h3>Diary Entries:</h3>
                    <p>{diaryEntry ? diaryEntry : '...'}</p>
                    <Button onClick={saveEntries} variant='outlined' size='small'>"Save Entry"</Button>
                </div>
            </div>

          <div className="option">
                <Button onClick={undo} variant='outlined' size='medium'>"Undo"</Button>
                <Button onClick={resetTranscript} variant='outlined' size='medium'>"Reset"</Button>
                <Button onClick={saveAll} variant='outlined' size='medium'>"Save All"</Button>
            </div>
            <div className="option">
                <Button onClick={() => setIsListening(!isListening)} variant='outlined' startIcon={<KeyboardVoiceIcon />}
                        color={isListening ? 'secondary' : 'primary'} size='medium'>{listenButtonText}</Button>
            </div>
            <div className="option">
                <Button onClick={backToHome} variant='outlined' size='small'>"Back"</Button>
            </div>
        </div>
    )

}

export default Create
