import React from 'react'
import { Button } from '@material-ui/core'
import '../styles/style.css'

const Notes = (props) => {

    function backToHome() {
        props.history.push('/');
    }

    return (
        <div className="container">
            <div className="heading">
                <h2>Notes</h2>
            </div>
            <div className="option">
                <Button onClick={backToHome} variant='outlined' size='small'>Back</Button>
            </div>
        </div>
    )
}

export default Notes