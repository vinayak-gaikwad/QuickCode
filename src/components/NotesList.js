import Note from './Note';
import AddNote from './AddNote';

const NotesList = ({
	notes,
	handleAddNote,
	handleDeleteNote,
}) => {
	return (
		<div className='notes-list'>
			<AddNote handleAddNote={handleAddNote} />
			{notes.map((note) => (
				<Note
					key={note.noteId}
					id={note.noteId}
					text={note.text}
					date={note.timestamp}
					handleDeleteNote={handleDeleteNote}
				/>
			))}

		</div>
	);
};

export default NotesList;
