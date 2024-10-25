
const axios = require('axios');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userMessage = req.body.message;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: userMessage }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      res.status(200).json({ response: response.data.choices[0].message.content });
    } catch (error) {
      res.status(500).json({ error: 'Erreur dans le traitement du message.' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}
