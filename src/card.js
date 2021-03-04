import React from 'react'
import './deck.css'

class Data extends React.Component {
    render() {
        return (
            <div>
                <div className='data-header'>{this.props.name}</div>
                <div className='data-value'>{this.props.value}</div>
            </div>
        )
    }
}

class Card extends React.Component {
    constructor(props) {
        super(props)

        let score = props.score
        let data = []

        const countgeki = parseInt(score.countgeki)
        const count300 = parseInt(score.count300)
        const countkatu = parseInt(score.countkatu)
        const count100 = parseInt(score.count100)
        const count50 = parseInt(score.count50)
        const countmiss = parseInt(score.countmiss)

        let acc = 0
        if (props.mode === '0') {
            acc = (50 * count50 + 100 * count100 + 300 * count300) / (300 * (countmiss + count50 + count100 + count300))
            data = [
                <Data key={0} name='300' value={count300} />,
                <Data key={1} name='100' value={count100} />,
                <Data key={2} name='50' value={count50} />,
                <Data key={3} name='Miss' value={countmiss} />
            ]
        } else if (props.mode === '1') {
            acc = (.5 * count100 + count300) / (countmiss + count100 + count300)
            data = [
                <Data key={0} name='Great' value={count300} />,
                <Data key={1} name='Good' value={count100} />,
                <Data key={2} name='Miss' value={countmiss} />
            ]
        } else if (props.mode === '2') {
            acc = (count50 + count100 + count300) / (countmiss + countkatu + count50 + count100 + count300)
            data = [
                <Data key={0} name='Fruits' value={count300} />,
                <Data key={1} name='Ticks' value={count100} />,
                <Data key={2} name='Drop Miss' value={countkatu} />,
                <Data key={3} name='Miss' value={countmiss} />
            ]
        } else if (props.mode === '3') {
            acc = (50 * count50 + 100 * count100 + 200 * countkatu + 300 * (count300 + countgeki)) / (300 * (countmiss + count50 + count100 + countkatu + count300 + countgeki))
            data = [
                <Data key={0} name='MAX' value={countgeki} />,
                <Data key={1} name='300' value={count300} />,
                <Data key={2} name='200' value={countkatu} />,
                <Data key={3} name='100' value={count100} />,
                <Data key={4} name='50' value={count50} />,
                <Data key={5} name='Miss' value={countmiss} />
            ]
        }

        score.acc = (acc * 100).toFixed(2)

        let enabled_mods = parseInt(score.enabled_mods)

        score.mods = []
        if (enabled_mods !== 0) {

            const mod_array = ['NF', 'EZ', 'TD', 'HD', 'HR', 'SD', 'DT', 'RX', 'HT', 'NC', 'FL', 'AT', 'SO', 'AP', 'PF']
            mod_array.forEach((el, i) => {
                if (((enabled_mods >>> i) & 1) === 1) {
                    score.mods.push(el)
                }
            })
        }

        if (score.mods.includes('DT') && score.mods.includes('NC')) {
            score.mods.splice(score.mods.indexOf('DT'), 1)
        }
        if (score.mods.includes('SD') && score.mods.includes('PF')) {
            score.mods.splice(score.mods.indexOf('SD'), 1)
        }

        this.state = {
            data: data
        }
    }

    render() {
        let score = this.props.score
        let rank = this.props.rank ? (
            <div className='card-rank'>
                <span>{score.rank.replace('H', '')}</span>
            </div>
        ) : null;
        return (
            <div className='container'>
                {rank}
                <div className='card-center'>
                    <div className='card-score'>{score.score}</div>
                    <div className='card-username'>{score.username}</div>
                    <div>{score.mods.map(mod => <img className='card-mod' src={process.env.PUBLIC_URL + '/mods/' + mod + '.png'} alt={mod} key={mod} />)}</div>
                </div>
                <div className='card-data'>
                    <div className='card-row'>
                        <Data key={0} name='Accuracy' value={score.acc} />
                        <Data key={1} name='Max Combo' value={score.maxcombo} />
                        <Data key={2} name='PP' value={Math.round(score.pp)} />
                    </div>
                    <div className='card-row'>
                        {this.state.data}
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;