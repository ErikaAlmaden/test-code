import { Router } from 'express';
import { ensureAuth } from '../middleware/auth.js';
import { index, newBook, create, edit, update, remove } from '../controllers/bookController.js';


const router = Router();


router.use(ensureAuth);


router.get('/', index);
router.get('/new', newBook);
router.post('/', create);
router.get('/:id/edit', edit);
router.post('/:id/update', update);
router.post('/:id/delete', remove);


export default router;