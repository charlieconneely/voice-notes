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
            command: 'view diary',
            callback: () => goToDiary()
        },
        {
            command: 'create',
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

    const goToDiary = () => {
        props.history.push('/diary')
    }

    return (
        <div className="container">
            <div className='heading'>
                <h2>Voice Diary</h2>
            </div>
            <div className='authors'>
                <p>Created by: <a href="https://github.com/charlieconneely">Charlie Conneely</a></p>
            </div>
            <div className='option'>
                <Button onClick={goToNotes} variant='outlined' size='large'>"View Notes"</Button>
                <Button onClick={goToDiary} variant='outlined' size='large'>"View Diary"</Button>
            </div>
            <div className='option'>
                <Button onClick={goToCreate} variant='outlined' size='large'>"Create"</Button>
            </div>
        </div>
    )

}

export default Home
