import express from 'express';
import { createNote,deleteNoteById,editNoteById,getNoteById,getNotes,getPredictResult } from './controller.js';
import multer from 'multer';

const router = express.Router();

// router.get('/', (_, res) => {
//     res.send('Homepage');
// });

// router.get('/about', (_, res) => {
//     res.send('About page');
// });

// router.all('/', (_, res) => {
//     res.status(405).send('Halaman tidak dapat diakses dengan method tersebut');
// });

// router.all('/about', (_, res) => {
//     res.status(405).send('Halaman tidak dapat diakses dengan method tersebut');
// });

// router.get(['/users', '/users/:username'], (req, res) => {
//     // Jika req.params.username undefined, variabel username akan bernilai 'stranger'
//     const { username = 'stranger' } = req.params;
//     const { name = 'unknown', location = 'unknown' } = req.query;
//     res.send(`Hello, ${username}:${name} from ${location}`);
// });

// router.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     res.send(`Welcome ${username}!`);
// });

router.post('/notes', createNote);
router.get('/notes', getNotes);
router.get('/notes/:id', getNoteById);
router.put('/notes/:id', editNoteById);
router.delete('/notes/:id', deleteNoteById);

const upload = multer(); 
router.post('/predict', upload.any(), getPredictResult);


router.use((_, res) => {
    res.send('Halaman tidak ditemukan');
});

export default router;