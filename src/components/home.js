import React from 'react'
import { Button } from '@material-ui/core'
import '../styles/style.css'

const Home = (props) => {

    function goToNotes() {
        props.history.push('/notes');
    }

    function goToCreate() {
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
                <Button onClick={goToNotes} variant='outlined' size='large'>View Notes</Button>
            </div>
            <div className='option'>
                <Button onClick={goToCreate} variant='outlined' size='large'>Create Note</Button>
            </div>
        </div>
    )
}

export default Home