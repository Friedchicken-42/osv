import React, { useState } from 'react'

const Beatmaps = () => {
    const [beatmaps, setBeatmaps] = useState([<Beatmap key="0" />])

    const add_beatmap = event => setBeatmaps([...beatmaps, <Beatmap key={beatmaps.length} />])

    return (
        <div>
            <h2>Beatmap link</h2>
            {beatmaps}
            <button className="add" onClick={add_beatmap}>+</button></div>
    )
}

const Beatmap = () => {
    return (
        <div>
            <input name='beatmap' type="text" className='fifty-percent'></input>
        </div>
    )
}

export default Beatmaps;