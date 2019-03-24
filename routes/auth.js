const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const queries = require('../data/usersQueries');
const secret = process.env.JWT_SECRET || 'super-secret-key';

function generateToken(user) {
  const payload = {
    user_id: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '24h'
  };
  return jwt.sign(payload, secret, options);
}

router.get('/register', async (req, res) => {
  try {
    const { body: user } = req;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    const newUser = await queries.addUser(user);
    const token = generateToken(newUser);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/login', async (req, res) => {
  try {
    let { username, password } = req.body;
    const user = queries.findByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `Welcome ${user.username}!`,
        token
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
