import bcrypt from 'bcryptjs';
import User from '../models/User.js';


export const showRegister = (req, res) => {
    res.locals.title = 'Register';
    res.render('auth/register');
}


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashed });
        res.redirect('/auth/login');
    } catch (err) {
        console.log(err.message);

        if (err.code === 11000) { 
            return res.status(400).render('auth/register', { error: 'Email is already in use.' });
        }

        res.status(500).render('auth/register', { error: 'Something went wrong. Please try again later.' });
    }
};


export const showLogin = (req, res) => {
    res.locals.title = 'Login';
    res.render('auth/login');
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            req.session.user = user;
            return res.redirect('/books');
        }
        else{
            throw new Error('Invalid credentials.')
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).render('auth/login', { error: err.message });
    }
};


export const logout = (req, res) => {
    req.session.destroy(() => res.redirect('/'));
};