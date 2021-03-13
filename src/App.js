import React, { useState } from 'react'
import axios from 'axios'
import Beatmaps from './beatmaps'
import Users from './users'
import View from './view'
import './App.css';

const key = process.env.REACT_APP_KEY;

const App = () => {
	return (
		<div>
			<h1>Osu Score Viewer</h1>
			<Multiplayer />
			<h4 className="line"><span>or</span></h4>
			<Players />
			<View />
		</div>
	)
}

const Multiplayer = () => {
	const [title, set_title] = useState('')

	const mp_title = (multiplayer) => {
		const mp = multiplayer.split('/').slice(-1)[0]
		axios.get('https://osu.ppy.sh/api/get_match', { params: { k: key, mp: mp } })
			.then(response => {
				const data = response.data
				set_title(data.match.name)

			})
			.catch(_ => {
				set_title('Multyplayer not found')
			})
	}

	const onEnter = (e) => {
		if (e.key === 'Enter') {
			mp_title(e.target.value);
		}
	}

	return (
		<div>
			<h2>Multiplayer link</h2>
			<input id='mp' type="text" className='size' onKeyDown={onEnter} onBlur={(e) => mp_title(e.target.value)}></input>
			<h2>{title}</h2>
		</div>
	)
}

const Mods = () => {
	const mods = { 'NM': 0, 'NF': 1, 'EZ': 2, 'HR': 16, 'SD': 32, 'PF': 16416, 'DT': 64, 'NC': 576, 'HD': 8, 'FL': 1024, 'SO': 4096 };
	return (
		<ul className="mods">
			{Object.entries(mods).map(([mod, value], i) => (
				<li key={i}>
					<input type="checkbox" id={'m' + i} value={value} />
					<label className="label-mod" htmlFor={'m' + i}><img src={process.env.PUBLIC_URL + '/mods/' + mod + '.png'} alt={mod} /> </label>
				</li>
			))}
		</ul>
	)
}

const Players = () => (
	<div>
		<Beatmaps />
		<Users />
		<Mods />
	</div>
)

export default App;
