import React from 'react'

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
