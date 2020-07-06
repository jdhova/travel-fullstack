const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({ msg: 'hello from react' });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app listning on ${port}`);
});
