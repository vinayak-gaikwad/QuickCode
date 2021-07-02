import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Editor from './Editor'
import { fontSizes, languageToEditorMode, themes } from './config/EditorOptions'
import './App.css'

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
    if(body.length === 0){ 
      alert("Body of editor is empty")
      return
    }

    const element = document.createElement("a");
    const file = new Blob([body],
      { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
  }

  return (
    <div className="container">
      <div>
        <label>Language</label>
        <select
          className="form-select"
          defaultValue={language}
          onChange={(event) => {
            setLanguage(event.target.value)
            // console.log(language)
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

    </div>
  )
}

export default App
