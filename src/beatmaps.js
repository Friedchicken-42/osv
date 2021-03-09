import React, { useState } from 'react'

const Beatmaps = () => {
    const [beatmaps, setBeatmaps] = useState([<Beatmap key="0" />])

    const add_beatmap = event => setBeatmaps([...beatmaps, <Beatmap key={beatmaps.length} />])

    const remove_beatmap = event => {
        if (beatmaps.length > 0) {
            setBeatmaps(beatmaps.slice(0, beatmaps.length - 1))
        }
    }

    return (
        <div>
            <h2>Beatmap link</h2>
            {beatmaps}
            <button className="btn" onClick={add_beatmap}>+</button>
            <button className="btn" onClick={remove_beatmap}>-</button>
        </div>
    )
}

const Beatmap = () => {
    return (
        <div>
            <input name='beatmap' type="text" className='size'></input>
        </div>
    )
}

export default Beatmaps;