import React from 'react';
import Moment from 'moment';

const Note = (props) => (
    <div className={props.note.active ? 'note active' : 'note'} id={props.note.id} onClick={props.handleNoteClick}>
        <div className="note__title">{props.note.title}</div>
        <div className="note__date">{Moment(props.note.creationDate).format('Do MMM YYYY')}</div>
    </div>
);

export default Note;