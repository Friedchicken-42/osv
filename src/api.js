import axios from 'axios'

const key = process.env.REACT_APP_KEY;

// ('https://osu.ppy.sh/api/get_user',params = { 'k': key, 'u': name, 'type': 'string' }

export const get_user = (name) =>
    axios.get('https://osu.ppy.sh/api/get_user', { params: { k: key, u: name, type: 'string' } })
        .then(response => {
            return response.data[0];
        })
