const axios = require('axios');
require('dotenv').config();

const token = process.env.VITE_TMDB_ACCESS_TOKEN_AUTH;
const accountId = '...'; // I need a real account ID

async function test() {
  try {
    const res = await axios.get('https://api.themoviedb.org/4/account/' + accountId + '/movie/687163/lists', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(JSON.stringify(res.data, null, 2));
  } catch (e) {
    console.log(e.response?.status, e.response?.data);
  }
}
// test();
