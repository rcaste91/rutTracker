const express = require('express');

const app = express();

app.use(express.static('./dist/RutTracker'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/RutTracker/'}
  );
  });

app.listen(process.env.PORT || 8080); 