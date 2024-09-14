import express from 'express';
import pool from '../database';

const router = express.Router();

router.get('/manga', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM manga');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

export default router;
