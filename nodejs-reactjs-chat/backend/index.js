const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const PORT_NUMBER = 3001;
const API_URL = 'https://api.chatengine.io/users/';
const CHAT_ENGINE_PRIVATE_KEY = process.env.CHAT_ENGINE_PRIVATE_KEY;

app.post('/authenticate', async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const response = await axios.put(
      API_URL,
      {
        username: username,
        secret: username
      },
      {
        headers: {
          'Private-Key': CHAT_ENGINE_PRIVATE_KEY
        }
      }
    );
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error details:', error);
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.listen(PORT_NUMBER, () => {
  console.log(`Server is running on port ${PORT_NUMBER}`);
});
