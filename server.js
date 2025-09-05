import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import expressLayouts from 'express-ejs-layouts';


import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';


dotenv.config();
connectDB();


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); 


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);


app.use((req, res, next) => {
    res.locals.title = 'Books App'
    res.locals.user = req.session.user;
    next();
});


app.get('/', (req, res) => res.render('index'));
app.use('/auth', authRoutes);
app.use('/books', bookRoutes);


app.listen(process.env.PORT, () => console.log(
    `Server running at http://localhost:${process.env.PORT}`
));