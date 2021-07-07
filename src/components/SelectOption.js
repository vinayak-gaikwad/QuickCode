import React from 'react'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function SelectOption({label, defaultValue, setValue, values,}) {
    return (
        <div>
            <label>{label}</label>
                <select
                  className="form-select"
                  defaultValue={defaultValue}
                  onChange={(event) => setValue(event.target.value)}
                >
                  {values.map((theme, index) => {
                    return (
                      <option key={index} value={theme}>
                        {theme}
                      </option>
                    );
                  })}
                </select>
        </div>
    )
}
