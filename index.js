const server = require('./server');

const port = 8333;
server.listen(port, () => console.log(`Server listening on port ${port}`));
