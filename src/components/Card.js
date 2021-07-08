import React from 'react'

export default function Card({title, topic, link}) {
    return (
        <div className="card my-2">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{topic}</h6>
                <a target='_blank' href={link} className="card-link">Click here</a>
                
            </div>
        </div>
    )
}
