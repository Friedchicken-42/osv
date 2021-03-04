import React from 'react'
import Deck from './deck'
import axios from 'axios'

const key = process.env.REACT_APP_KEY;

class View extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            decks: []
        }
        this.create_decks = this.create_decks.bind(this)
    }

    create_decks(_) {
        this.setState({ decks: [] })

        const mp = document.getElementById('mp').value
        const beatmaps = Array.from(document.getElementsByName('beatmap'))
            .map(el => el.value)
            .filter(el => el !== '')
        const users = Array.from(document.getElementsByName('user'))
            .map(el => el.value)
            .filter(el => el !== '')

        if (mp === '') {
            if (users.length === 0) return;
            if (beatmaps.length === 0) return;

            const promises = beatmaps.map(beatmap_url => {
                const x = beatmap_url.split('/').splice(4)
                let mode = x[0].split('#')[1]
                mode = ['osu', 'taiko', 'fruits', 'mania'].indexOf(mode);
                const beatmap_id = x[1]
                return axios.get('https://osu.ppy.sh/api/get_beatmaps', { params: { k: key, b: beatmap_id, m: mode } })
            })
            axios.all(promises).then(responses => {
                responses.forEach(r => {
                    const beatmap = r.data[0]
                    beatmap.difficultyrating = parseFloat(beatmap.difficultyrating).toFixed(2);
                    const promises = users.map(user => axios.get('https://osu.ppy.sh/api/get_scores', { params: { k: key, b: beatmap.beatmap_id, m: beatmap.mode, u: user, type: 'string' } }))
                    axios.all(promises).then(responses => {
                        let scores = responses.map(r => r.data[0])

                        console.log(beatmap.title)
                        this.setState({ decks: [...this.state.decks, <Deck beatmap={beatmap} scores={scores} rank={true} />] })
                    })
                })
            })
        }
    }
    render() {
        return (
            <div>
                <button className="view" onClick={this.create_decks}>View</button>
                {this.state.decks.map((e, i) => <span key={i}>{e}</span>)}
            </div>
        )
    }
}

export default View;