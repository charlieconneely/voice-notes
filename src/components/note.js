import React from 'react'
import '../styles/style.css'

const Note = (props) => {
    return(
        <div className="note">
            <p>{props.note}</p>
        </div>
    )
}

export default Note