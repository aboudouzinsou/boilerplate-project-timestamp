const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Utiliser le middleware CORS

// Configurer EJS comme moteur de template
app.set('view engine', 'ejs');

// Route pour la vue de test
app.get('/', (req, res) => {
  res.render('index');
});

// Route pour l'API
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  let date;
  if (dateParam) {
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  } else {
    date = new Date();
  }

  if (date.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
