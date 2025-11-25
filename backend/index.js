const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 3000;

app.use(cors())

const data = require('./data/data.js');

// iterate over the elements of data
let curr_index = 0;

// return current item
app.get('/item', (req, res) => {
  res.json({
    curr_index,
    item: data[curr_index],
    total: data.length
  });
});

// move to the next one
app.get('/item/next', (req, res) => {
  curr_index = (curr_index + 1) % data.length;

  res.json({
    curr_index,
    item: data[curr_index],
    total: data.length
  });
});

// move to the previous one
app.get('/item/prev', (req, res) => {
  curr_index = (curr_index - 1 + data.length) % data.length;

  res.json({
    curr_index,
    item: data[curr_index],
    total: data.length
  });
});

app.get('/item/:id', (req, res) => {
  let id = parseInt(req.params.id);

  if (id < 0 || id >= data.length) {
    return res.status(400).json({ error: "Invalid index, out of range" });
  }

  curr_index = id;
  res.json({
    curr_index,
    item: data[curr_index],
    total: data.length
  });

});

// displays on the main page
app.get('/', (req, res) => {
  res.send('This is the home page. Nothing much to see here');
});

// does an action when there's a new activity on the port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
