import jwt from 'jsonwebtoken';

export default async function authenticate(req, res, next) {
  const jsonToken = req.headers['x-access-token'];
  if (!jsonToken) {
    return res.status(404).send({ message: 'Not access token' });
  }
  jwt.verify(jsonToken, process.env.SECRETKEY, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.user = decoded;
    next();
    return null;
  });
  return null;
}
