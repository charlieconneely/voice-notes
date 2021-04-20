import { React, useState, useEffect } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button } from '@material-ui/core'
import '../styles/style.css'

const Create = (props) => {

    const [isListening, setIsListening] = useState(false);
    const { transcript, resetTranscript } = useSpeechRecognition();
    const listenButtonText = isListening ? 'Stop Listening' : 'Start Listening'

    useEffect(() => {

    }, [])

    function backToHome() {
        props.history.push('/');
    }

    function changeIsListening() {
        setIsListening(!isListening)

        if(isListening) { 
            SpeechRecognition.stopListening() 
        } else {
            SpeechRecognition.startListening({ continuous: true })
        }
    }   

    return (
        <div className="container">
            <div className="option">
                <p>{transcript ? transcript : '...'}</p>
            </div>
            <div className="controls">
                <Button variant='outlined' size='small'>Undo</Button>
                <Button onClick={resetTranscript} variant='outlined' size='small'>Reset</Button>
            </div>
            <div className="option">
                <Button onClick={changeIsListening} variant='outlined' 
                        color={isListening ? 'secondary' : 'primary'} size='medium'>{listenButtonText}</Button>
            </div>
            <div className="option">
                <Button onClick={backToHome} variant='outlined' size='small'>Back</Button>
            </div>
        </div>
    )
}

export default Create