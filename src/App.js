import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Editor from './Editor'
import { fontSizes, languageToEditorMode, themes } from './config/EditorOptions'
import './App.css'
import { Route, Link } from 'react-router-dom'

import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import Header from './components/Header';

const baseURL = 'http://localhost:8080'
const API = axios.create({
  baseURL: baseURL
});

function App() {

  const languages = Object.keys(languageToEditorMode)
  const idleStatus = 'Idle';
  const runningStatus = 'running';
  const compeletedStatus = 'completed';
  const errorStatus = 'Some error occured';

  const [language, setLanguage] = useState('c');
  const [theme, setTheme] = useState(themes[0])
  const [fontSize, setFontSize] = useState('16')
  const [input, setInput] = useState('')
  const [submissionStatus, setSubmissionStatus] = useState(idleStatus)
  const [submissionId, setSubmissionId] = useState('')
  const [body, setBody] = useState('')
  const [output, setOutput] = useState('')
  const [submissionCheckerId, setSubmissionCheckerId] = useState(null);


  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem('react-notes-app-data')
    );

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'react-notes-app-data',
      JSON.stringify(notes)
    );
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const fileInput = useRef(null);

  const visionAPI = () => {
    const fileName = fileInput.current.files[0]
    const data = new FormData()
    data.append('file', fileName)
    axios.post('http://localhost:5000/upload', data, {})
      .then(res => {
        console.log(res.data.text)
        setBody(res.data.text)
      })
  }

  const handleFileChange = (e) => {
    console.log(e.target.value)
  }

  useEffect(() => {
    if (submissionCheckerId && submissionStatus === compeletedStatus) {
      clearInterval(submissionCheckerId);
      setSubmissionCheckerId(null);

      const params = new URLSearchParams({
        id: submissionId,
        api_key: 'guest'
      });
      const querystring = params.toString();
      API.get(`https://api.paiza.io/runners/get_details?${querystring}`).then((res) => {
        const { stdout, stderr, build_stderr } = res.data;
        console.log(res.data);
        let output = '';
        if (stdout) output += stdout;
        if (stderr) output += stderr;
        if (build_stderr) output += build_stderr;
        console.log(output)
        setOutput(output);

      });
    }
  }, [submissionStatus]);

  ///handling submission of the code by the user for compilation
  const handleSubmit = () => {
    if (submissionStatus === runningStatus) return;
    setSubmissionStatus(runningStatus);

    const params = {
      source_code: body,
      language: language,
      input: input,
      api_key: 'guest'
    };
    API.post(`https://api.paiza.io/runners/create`, params)
      .then((res) => {
        const { id, status } = res.data;
        setSubmissionId(id);
        setSubmissionStatus(status);
      })
      .catch((err) => {
        setSubmissionId('');
        setSubmissionStatus(errorStatus);
      });
  };

  useEffect(() => {
    if (submissionId) {
      setSubmissionCheckerId(setInterval(() => updateSubmissionStatus(), 1000));
    }
  }, [submissionId]);

  // for checking the status of execution of the program
  const updateSubmissionStatus = () => {
    const params = new URLSearchParams({
      id: submissionId,
      api_key: 'guest'
    });
    const querystring = params.toString();
    API.get(`https://api.paiza.io/runners/get_status?${querystring}`).then((res) => {
      const { status } = res.data;
      setSubmissionStatus(status);
    });
  };

  // to update the body as per the editor
  const handleUpdateBody = (value) => {
    setBody(value);
    console.log(value)
  };

  const handleUpdateInput = (value) => {
    setInput(value);
  };

  const handleDownload = () => {
    if (body.length === 0) {
      alert("Body of editor is empty")
      return
    }

    const element = document.createElement("a");
    const file = new Blob([body],
      { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = prompt("Name of the file:") || language + Date.now()
    document.body.appendChild(element);
    element.click();
  }

  return (
    <div className="container">
      <div className={`${darkMode && 'dark-mode'}`} >
        <button>
          <Link to='/editor'>Editor</Link>
        </button>
        <button>
          <Link to='/notes' >Notes</Link>
        </button>
        <button>
          <Link to='/resources' >Resources</Link>
        </button>

        <div className={`${darkMode && 'dark-mode'}`} >
          <Route path='/notes' render={() => <>
            <Header handleToggleDarkMode={setDarkMode} />
            <Search handleSearchNote={setSearchText} />
            <NotesList
              notes={notes.filter((note) =>
                note.text.toLowerCase().includes(searchText)
              )}
              handleAddNote={addNote}
              handleDeleteNote={deleteNote}
            />
          </>} />
        </div>

        <div>
          <Route path='/editor' render={() =>
            <>
              <div>
                <label>Language</label>
                <select
                  className="form-select"
                  defaultValue={language}
                  onChange={(event) => {
                    setLanguage(event.target.value)
                  }}
                >
                  {languages.map((lang, index) => {
                    return (
                      <option key={index} value={lang} selected={lang === language}>
                        {lang}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label>Theme</label>
                <select
                  className="form-select"
                  defaultValue={theme}
                  onChange={(event) => setTheme(event.target.value)}
                >
                  {themes.map((theme, index) => {
                    return (
                      <option key={index} value={theme}>
                        {theme}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label>Font Size</label>
                <select
                  className="form-select"
                  defaultValue={fontSize}
                  onChange={(event) => setFontSize(event.target.value)}
                >
                  {fontSizes.map((fontSize, index) => {
                    return (
                      <option key={index} value={fontSize}>
                        {fontSize}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <div>

                  <input
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInput}

                  />
                </div>
                <div>
                  <button onClick={visionAPI} >Get Code</button>
                </div>

                <div>
                  <button onClick={handleSubmit} >Submit</button>
                </div>

                <div>
                  <button onClick={handleDownload} >Download</button>
                </div>

              </div>
              <div className="row" >
                <div className="col-lg-6 col-sm-12" >
                  <p>EDITOR</p>

                  <Editor
                    language={language}
                    theme={theme}
                    body={body}
                    setBody={handleUpdateBody}
                    readOnly={false}
                    fontSize={fontSize}
                  />
                </div>

                <div className="col-lg-6 col-sm-12" >
                  <p>INPUT</p>
                  <Editor
                    language=''
                    theme={theme}
                    body={input}
                    setBody={handleUpdateInput}
                    readOnly={false}
                    fontSize={fontSize}
                  />

                </div>
                <div className="col-sm-12" >
                  <p>OUTPUT</p>
                  <Editor
                    language=""
                    theme={theme}
                    body={output}
                    setBody={setOutput}
                    readOnly={true}
                    fontSize={fontSize}
                  />
                </div>

              </div>
            </>
          } />

        </div>
        <div>

        </div>
        <Route path='/resources' render={() =>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="card-link">Card link</a>
              <a href="#" className="card-link">Another link</a>
            </div>
          </div>
        } />

      </div>
    </div>
  )
}

export default App
