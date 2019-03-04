import React from 'react';

const NotePanel = (props) => (
    <div className="note-panel">
        <textarea
            name="note"
            id="note"
            data-note-id={props.currentNote.id}
            cols="30"
            rows="10"
            onChange={props.handleChange}
            value={props.currentNote.content}
        >
        </textarea>
    </div>
);

export default NotePanel;