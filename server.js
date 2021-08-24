var express = require('express');
var app = express();

var { quotes } = require('./data');
var { getRandomElement } = require('./utils');

var PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes', (req, res) => {
   var author = req.query.person;
   if (author) {
      var quote = quotes.filter(item=>item.person==author);
      if (quote) {
         res.status(201).json({ "quotes": quote });
      } else {
         res.status(404).send('Error occurred.');
      }
   } else {
      res.status(201).json({ "quotes": quotes });
   }
});

app.get('/api/quotes/random', (req, res) => {
   var quote = getRandomElement(quotes);
   if (quote) {
      res.status(201).json({ "quote": quote });
   } else {
      res.status(404).send('Error occurred.');
   }
});

app.post('/api/quotes', (req, res) => {
   var newQuote = req.query.quote;
   var newAuthor = req.query.person;
   if (newQuote && newAuthor) {
      var newEntry = JSON.parse(`{ "quote": "${newQuote}", "person": "${newAuthor}" }`);
      quotes.push(newEntry);
      res.status(200).json({ "quote": newEntry });
   } else { 
      res.status(400).send();
   }
});

app.listen(PORT, () => {
   console.log(`Server listening at port : ${PORT}`);
});