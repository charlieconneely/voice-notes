import { useEffect, useState, React } from 'react'
import { Button } from '@material-ui/core'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import isValidNumber from './numberIdentifier'
import Entry from './entry'

const Diary = (props) => {

    const [storedEntries, setStoredEntries] = useState([])

    useEffect(() => {
        let entries = JSON.parse(localStorage.getItem('entries'));
        setStoredEntries([...entries])
    }, [])

    const backToHome = () => {
        props.history.push('/');
    }

    /* called from Diary child component */
    const deleteEntry = (val) => {
        let diaryArr = JSON.parse(localStorage.getItem('entries'))
        diaryArr = diaryArr.filter(entry => entry !== val)
        localStorage.setItem('entries', JSON.stringify(diaryArr))
        setStoredEntries([...diaryArr])
    }

    let entriesArr = [...storedEntries];
    return(
        <div className="container">
            <div className="heading">
                <h3>Your Entries:</h3>
            </div>

            {entriesArr.map( (entry, index) => 
                <Entry key={entry} deleteEntry={deleteEntry} index={index} entry={entry} /> 
            )}

            <div className="note">
                <Button onClick={backToHome} variant='outlined' size='small'>"Back"</Button>
            </div>
        </div>
    )
}

export default Diary