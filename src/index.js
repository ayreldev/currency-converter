require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/convert', async (req, res) => {
  const { from, to, amount } = req.query;
  const apiKey = process.env.API_KEY; // Chave de API segura
  const url = `https://api.exchangerate-api.com/v4/latest/${from}`;

  try {
    const response = await axios.get(url);
    const rate = response.data.rates[to];
    const result = rate * amount;

    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao converter moeda' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
