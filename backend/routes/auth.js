import jwt from 'jsonwebtoken';

export default function verifyToken(token) {
  try {
    const verify = jwt.verify(token, process.env.NOT_A_SECRET);
  } catch (err) {
    return false;
  }
  return jwt.decode(token, process.env.NOT_A_SECRET);
}
