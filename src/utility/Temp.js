{/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            
            <Link class="navbar-brand" to="/" >QuickCode</Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav ">
                <li class="nav-item">
                  <Link class="nav-link active" aria-current="page"  to='/editor'>Editor</Link>
                </li>
                <li class="nav-item">
                  
                  <Link  class="nav-link"  onClick={loadNotes} to='/notes' >Notes</Link>
                </li>
                <li class="nav-item">
                  
                  <Link class="nav-link"  to='/resources' >Resources</Link>
                </li>
                <li class="nav-item">
                  
                  <Link class="nav-link"  tabindex="-1" aria-disabled="true" to='/logout' >LogOut</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav> */}

        /////////////////////////////////////////////////////////////////////

         {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            
            <Link class="navbar-brand" to="/" >QuickCode</Link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse " id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                <Link class="nav-link active " aria-current="page" to='/login' >Login</Link>
                
                </li>
                <li class="nav-item">

                  <Link class="nav-link" to='/register' >Register</Link>
                </li>
                
              </ul>
          
            </div>
          </div>
        </nav> */}
        const EditorPage = () => {
            return (
              <div>
                <div>
                  <SelectOption
                    label="Language"
                    defaultValue={language}
                    setValue={setLanguage}
                    values={languages}
                  />
                </div>
        
                <div>
                  <SelectOption
                    label="Theme"
                    defaultValue={theme}
                    setValue={setTheme}
                    values={themes}
                  />
        
                </div>
                <div>
                  <SelectOption
                    label="Font Size"
                    defaultValue={fontSize}
                    setValue={setFontSize}
                    values={fontSizes}
                  />
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
                      handleBodyChange={(val)=>handleUpdateBody(val)}
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
                      handleBodyChange={handleUpdateInput}
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
                      handleBodyChange={setOutput}
                      readOnly={true}
                      fontSize={fontSize}
                    />
                  </div>
                </div>
              </div>
            )
          }

          {/* <PrivateRoute exact path="/" component={Home} /> */}
          {/* <Redirect from='/' to="/editor" /> */}