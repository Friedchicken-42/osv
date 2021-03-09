import React from 'react'
import Card from './card'
import './deck.css'

class Deck extends React.Component {
    render() {
        const beatmap = this.props.beatmap
        return (
            <div className='deck'>
                <div className='beatmap' style={{ backgroundImage: `url(https://assets.ppy.sh/beatmaps/` + beatmap.beatmapset_id + `/covers/cover.jpg)` }}>
                    <div className='beatmap-title'>{beatmap.title}</div>
                    <div className='beatmap-version'>{beatmap.version}</div>
                    <div className='beatmap-sr'>{beatmap.difficultyrating}</div>
                </div>
                <div>
                    {this.props.scores
                        .filter(score => score != null)
                        .sort((s0, s1) => s1.score - s0.score)
                        .map((score, i) => <Card key={i} rank={this.props.rank} score={score} mode={beatmap.mode} />
                        )}
                </div>
            </div>
        )
    }
}

export default Deck;