import React from 'react'
import { Button } from '@material-ui/core'
import '../styles/style.css'

const Create = (props) => {

    function backToHome() {
        props.history.push('/');
    }

    return (
        <div className="container">
            <div className="heading">
                <h2>Create screen</h2>
            </div>
            <div className="option">
                <Button onClick={backToHome} variant='outlined' size='small'>Back</Button>
            </div>
        </div>
    )
}

export default Create