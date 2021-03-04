import React from 'react'
import Beatmaps from './beatmaps'
import Users from './users'
import View from './view'
import './App.css';

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
	return (
		<div>
			<h2>Multiplayer link</h2>
			<input id='mp' type="text" className='fifty-percent' disabled placeholder="wip"></input>
		</div>
	)
}

const Players = () => (
	<div>
		<Beatmaps />
		<Users />
	</div>
)

export default App;
