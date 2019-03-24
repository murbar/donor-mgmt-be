require('dotenv').config();

const server = require('./api/server.js');

// middlewares
// routers
// auth on specific routers

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n<<< It's a pleasure to serve you today on port ${port} >>>\n`);
});
