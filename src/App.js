import React, { Component } from 'react';
import './App.scss';
import NotePanel from './NotePanel'
import Notes from './Notes';
import Moment from 'moment';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [
                {
                    id: '1',
                    title: 'Bacon ipsum dolor amet chuck short ribs rump meatloaf.',
                    content: 'Bacon ipsum dolor amet chuck short ribs rump meatloaf.\nAndouille jerky swine rump strip steak. Tail ham tenderloin porchetta alcatra. Filet mignon shankle buffalo beef tri-tip kielbasa.',
                    creationDate: 1421434781000,
                    active: false
                },
                {
                    id: '2',
                    title: 'Beef ribs boudin ham kielbasa tenderloin strip steak',
                    content: 'Beef ribs boudin ham kielbasa tenderloin strip steak.\nStrip steak bacon ribeye shankle ball tip pork belly. Swine cow pork, porchetta biltong tenderloin turducken bacon ham meatloaf pig rump capicola kevin tail. Chicken alcatra rump drumstick cow pancetta. Ham t-bone doner meatloaf porchetta, hamburger turkey sausage salami beef ribs tenderloin.',
                    creationDate: 1536173981000,
                    active: false
                },
                {
                    id: '3',
                    title: 'Pork chop turducken kevin frankfurter',
                    content: 'Pork chop turducken kevin frankfurter\nsausage andouille ball tip venison alcatra flank buffalo jowl ham hock pork belly chicken. Buffalo brisket sirloin pork loin leberkas beef ribeye jowl. Jowl meatball drumstick tongue short ribs brisket pork capicola alcatra pig hamburger jerky ball tip tenderloin beef. Pork loin shankle ham hock turkey tenderloin fatback. Pancetta picanha ground round shank cow beef frankfurter venison short loin boudin ribeye chuck capicola alcatra andouille. Pork turducken landjaeger, short ribs kevin ham hock tri-tip. Brisket chuck meatball, pork loin chicken tri-tip ground round meatloaf.',
                    creationDate: 1497380381000,
                    active: false
                },
                {
                    id: '4',
                    title: 'Lorem Ipsum\'s father was with Lee Harvey Oswald prior to Oswald\'s being, you know, shot. The other thing with Lorem Ipsum is that you have to take out its family. All of the words in Lorem Ipsum have flirted with me - consciously or unconsciously. That\'s to be expected.',
                    content: 'Lorem Ipsum\'s father was with Lee Harvey Oswald prior to Oswald\'s being, you know, shot. The other thing with Lorem Ipsum is that you have to take out its family. All of the words in Lorem Ipsum have flirted with me - consciously or unconsciously. That\'s to be expected.',
                    creationDate: 1422817181000,
                    active: false
                },
                {
                    id: '5',
                    title: 'It’s about making placeholder text great again.',
                    content: 'It’s about making placeholder text great again.\n\nThat’s what people want, they want placeholder text to be great again. Look at that text! Would anyone use that? Can you imagine that, the text of your next webpage?! You know, it really doesn’t matter what you write as long as you’ve got a young, and beautiful, piece of text. This placeholder text is gonna be HUGE. If Trump Ipsum weren’t my own words, perhaps I’d be dating it.',
                    creationDate: 1546887581000,
                    active: false
                },
                {
                    id: '6',
                    title: 'This placeholder text is gonna be HUGE.',
                    content: 'This placeholder text is gonna be HUGE.\n\nSome people have an ability to write placeholder text... It\'s an art you\'re basically born with. You either have it or you don\'t.',
                    creationDate: 1426964381000,
                    active: false
                }
            ],
            currentNote: {
                id: '',
                title: '',
                content: '',
                creationDate: undefined,
                active: false
            }
        };

        this.handleNewNote = this.handleNewNote.bind(this);
        this.handleNoteClick = this.handleNoteClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleNewNote() {
        const date = new Date();
        const timeStamp = date.getTime();
        const id = (this.state.notes.length + 1).toString();

        this.setState({
            currentNote: {
                id,
                title: '',
                content: '',
                creationDate: timeStamp,
                active: true
            }
        }, () => {
            let notesCopy = JSON.parse(JSON.stringify(this.state.notes));
            notesCopy.forEach(note => {
                note.active = false;
            });
            this.setState({
                notes: notesCopy
            });
            this.setState((prevState) => ({ notes: prevState.notes.concat(this.state.currentNote) }));

        });
    };

    handleNoteClick(e) {
        const noteId = e.currentTarget.id;
        const notesCopy = this.state.notes;

        notesCopy.forEach((note) => note.active = (note.id === noteId) ? true : false);

        const currentNote = this.state.notes.find((note) => note.id === noteId);

        this.setState({
            notes: notesCopy,
            currentNote
        });
    };

    handleChange(e) {
        const id = e.target.dataset.noteId;
        const content = e.target.value;
        const title = content.split('\n')[0];

        const noteToUpdate = this.state.notes.indexOf(this.state.notes.find((note) => note.id === id));

        let notes = this.state.notes;
        notes[noteToUpdate].title = title;
        notes[noteToUpdate].content = content;

        let currentNote = this.state.currentNote;
        currentNote.id = id;
        currentNote.title = title;
        currentNote.content = content;

        this.setState({
            notes,
            currentNote
        });
    }

    updateNotes() {

    }

    render() {
        const notes = this.state.notes;
        notes.sort((a, b) => b.creationDate - a.creationDate);
        if (this.state.currentNote.id === '') {
            notes[0].active = true
            this.setState({
                notes: notes,
                currentNote: notes[0]
            })
        }
        return (
            <div className="App">
                <div className='header'>
                    <div className="new-button">
                        <button onClick={this.handleNewNote}>New note</button>
                    </div>
                    <div className="created-date">
                        <div>{this.state.currentNote.creationDate ? 'Created: ' + Moment(this.state.currentNote.creationDate).format('Do MMM YYYY') : ''}</div>
                    </div>
                </div>
                <div className="main">
                    <Notes
                        notes={this.state.notes}
                        handleNoteClick={this.handleNoteClick}
                    />
                    <NotePanel
                        currentNote={this.state.currentNote}
                        handleChange={this.handleChange}
                    />
                </div>
            </div>
        );
    }
}

export default App;
