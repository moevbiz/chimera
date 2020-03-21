const express = require('express');
const app = express();
const router = express.Router();
const Arena = require('are.na');
let arena = new Arena();

const channel = 'think-about-it-domjvhshxsq'

// base API route
app.get('/api', (req, res) => {
  arena.channel(channel).get({ 
    page: req.query.page ? req.query.page : 1, 
    per: req.query.per ? req.query.per : 64,
  direction: 'desc',
  sort: 'position'
  })
  .then(chan => {
      res.send(chan);
  })
  .catch(err => console.log(err));
});

app.get('/api/class/:slug', (req, res) => {
  arena.channel(channel)
  .search(slug)
  .get({ page: req.query.page ? req.query.page : 1, per: 64,
  direction: 'desc',
  sort: 'position'
  })
  .then(chan => {
      res.send(chan);
  })
  .catch(err => console.log(err));
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.use(express.static(__dirname + '/public', {
  extensions: ['html', 'htm'],
}));

app.listen(3000);