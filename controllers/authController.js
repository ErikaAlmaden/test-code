import bcrypt from 'bcryptjs';
import User from '../models/User.js';


export const showRegister = (req, res) => res.render('auth/register');


export const register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed });
    res.redirect('/auth/login');
};


export const showLogin = (req, res) => res.render('auth/login');


export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        req.session.user = user;
        return res.redirect('/books');
    }
    res.redirect('/auth/login');
};


export const logout = (req, res) => {
    req.session.destroy(() => res.redirect('/'));
};