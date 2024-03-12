import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const authController = {
    async register(req, res) {
        try {
            const { username, password } = req.body;

            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already in use' });
            }

            const hashedPass = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                password: hashedPass,
            });

            await newUser.save();

            res.status(201).json({ message: 'User registered' })
        } catch (error) {
            console.error(error.stack);
            res.status(500).json({ message: "Server Error" });
        }
    },

    async login(req, res) {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });
            if (!user) {
                return res.status(401).json({ message: 'Invalid username' })
            }

            const isPassVal = await bcrypt.compare(password, user.password);
            if (!isPassVal) {
                return res.status(401).json({ message: 'Invalid Password' })
            }
            const secretKey = crypto.randomBytes(32).toString('hex');
            const token = jwt.sign({ userId: user._id, username: user.username }, secretKey, {
                expiresIn: '2h',
            });
            res.status(200).json({ token });
        } catch (error) {
            console.error(error.stack);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async profile(req, res) {
        try {
            const user = await User.findById(req.userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ username: user.username });
        } catch (error) {
            console.error(error.stack);
            res.status(500).json({ message: 'Server Error' });
        }
    },

    async updateProfile(req, res) {
        try {
            const { username } = req.body;

            await User.findByIdAndUpdate(req.userId, { username });

            res.status(200).json({ message: 'Profile updated successfully' });
        } catch (error) {
            console.error(error.stack);
            res.status(500).json({ message: 'Server Error' });
        }
    },
};

export default authController;