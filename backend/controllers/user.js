import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from '../models/user';

export default class UserController {
  async signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      const userName = await User.findOne({ name });
      if (!password || password.length < 2) {
        return res.status(500).json({ message: 'Password length mast be > 2 symbol' });
      }
      if (userName) {
        return res.status(402).json({ message: 'You cannot use a name like this' });
      }
      const hashPassword = await bcryptjs.hash(password, 10);
      const user = new User({
        name, email, password: hashPassword,
      });
      await user.save();
      res.send({ message: 'Register is successful' }).status(200);
    } catch (e) {
      return res.status(500).json({ e });
    }
  }

  async signIn(req, res) {
    try {
      const { name, password } = req.body;
      const user = await User.findOne({ name });
      if (!user) {
        return res.status(500).json({ message: 'This user does not exist' });
      }
      const passwordComparison = await bcryptjs.compare(password, user.password);

      if (!passwordComparison) {
        return res.status(401).json({ message: 'Wrong password' });
      }
      await jwt.sign({ userId: user._id }, process.env.SECRETKEY, (err, token) => {
        res.json({ token });
      });
    } catch (e) {
      return res.status(500).json({ e });
    }
  }
}
