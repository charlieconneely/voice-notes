import { React, useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import '../styles/style.css'

const Home = (props) => {

    const commands = [
        { 
            command: ['Go back', 'Back again'],
            callback: () => goToPrev() 
        },
        {
            command: 'view notes',
            callback: () => goToNotes()
        },
        {
            command: 'create note',
            callback: () => goToCreate()
        }
    ]

    useSpeechRecognition({ commands });

    useEffect(() => {
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            alert("Your browser does not support our speech recognition.");
        } else {
            SpeechRecognition.startListening({ continuous: true })
        }
    }, [])

    let history = useHistory();
    const goToPrev = () => {
        history.goBack();
    }

    const goToNotes = () => {
        props.history.push('/notes');
    }

    const goToCreate = () => {
        props.history.push('/create');
    }

    return (
        <div className="container">
            <div className='heading'>
                <h2>Voice Diary</h2> 
            </div>
            <div className='authors'>
                <p>Created by: Charlie Conneely</p>
            </div>
            <div className='option'>
                <Button onClick={goToNotes} variant='outlined' size='large'>"View Notes"</Button>
            </div>
            <div className='option'>
                <Button onClick={goToCreate} variant='outlined' size='large'>"Create Note"</Button>
            </div>
        </div>
    )

}

export default Home