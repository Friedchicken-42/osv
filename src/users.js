import React, { useState } from 'react'
import axios from 'axios'

const key = process.env.REACT_APP_KEY;

const Users = () => {

    const users = [...Array(4).keys()].map(el => <User key={el} />)

    return (
        <div>
            <h2>Usernames</h2>
            <div className='container'>
                {users}
            </div>
        </div>
    )
}

const User = () => {
    const [image, setImage] = useState(process.env.PUBLIC_URL + '/avatar-guest.png')

    const get_user = (name) =>
        axios.get('https://osu.ppy.sh/api/get_user', { params: { k: key, u: name, type: 'string' } })
            .then(response => {
                return response.data[0];
            })


    const update_image = (name) => {
        if (name === '') {
            setImage(process.env.PUBLIC_URL + '/avatar-guest.png')
        } else {
            get_user(name)
                .then(data => {
                    if (data) setImage('http://s.ppy.sh/a/' + data.user_id)
                })
        }
    }

    const onEnter = (e) => {
        if (e.key === 'Enter') {
            update_image(e.target.value);
        }
    }

    return (
        <div className='user-box'>
            <div>
                <input name='user' type='text' onKeyDown={onEnter} onBlur={(e) => update_image(e.target.value)}></input>
            </div>
            <br />
            <div>
                <img className='user-image' src={image} alt='user pfp' />
            </div>
        </div>
    )
}

export default Users;