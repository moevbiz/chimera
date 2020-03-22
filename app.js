const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());
const router = express.Router();
const Arena = require('are.na');
let arena = new Arena();

// var channel = 'symbolic-space'
// var channel = 'ittg_p'
var channel = 'chimera-bmu8__lhcmc'

app.use(bodyParser.urlencoded({ extended: false }));

// * base API route
app.get('/api', (req, res) => {
  channel = req.query.channel ? req.query.channel : channel
  arena.channel(channel).get({ 
    page: req.query.page ? req.query.page : 1, 
    per: req.query.per ? req.query.per : 64,
  direction: 'desc',
  sort: 'position'
  })
  .then(channel => {
      res.send(channel);
  })
  .catch(err => console.log(err));
});

// * TODO: make single block view work correctly
// ------------------------------------------------------------------
// app.get('/api/block/', (req, res) => {
//   arena.block(req.query.id)
//   .get()
//   .then(block => {
//     res.send(block)
//   })
//   .catch(err => console.log(err))
// })
// ------------------------------------------------------------------

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})

app.get('/block', (req, res) => {
  res.sendFile(__dirname + '/public/post.html');
})

app.use(express.static(__dirname + '/public', {
  extensions: ['html', 'htm'],
}));

app.listen(3000);
