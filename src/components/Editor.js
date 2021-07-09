import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/ext-language_tools';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-rust';
import 'ace-builds/src-noconflict/mode-kotlin';

import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-eclipse';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/theme-tomorrow_night_blue';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-ambiance';
import 'ace-builds/src-noconflict/theme-solarized_light';

export default function Editor({ language,
    theme,
    body,
    handleBodyChange,
    height,
    readOnly,
    width,
    fontSize }) {
    return (
            <AceEditor
                mode={language}
                theme={theme}
                onChange={val => handleBodyChange(val)}
                value={body}
                width={width ? width : '100%'}
                height={height ? height : '73vh'}
                readOnly={readOnly ? readOnly : false}
                fontSize={fontSize ? (isNaN(+fontSize) ? 12 : +fontSize) : 12}
                name={language + theme}
                showGutter={true}
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true
                }}
            />
        
    )
}
