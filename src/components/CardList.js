import React from 'react'
import Card from './Card'

export default function CardList({resources}) {
    return (
        <div>
            {
                resources.map((res, ind) =>{
                    return (
                    <Card
                    key={ind}
                    title={res.name}
                    topic={res.topic[0]}
                    link={res.link}
                    />
                    )
                })
            }
            
        </div>
    )
}
