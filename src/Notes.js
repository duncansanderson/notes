import React from 'react';
import Note from './Note';

const Notes = (props) => (
    <div className="notes-list">
    {
        props.notes.map((note, index) => (
            <Note
                key={note.id}
                note={note}
                handleNoteClick={props.handleNoteClick}
            />
        ))
    }
    </div>
);

export default Notes;