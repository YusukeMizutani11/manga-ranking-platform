import express from 'express';
import pool from '../database';

const router = express.Router();

// Get a list of all manga
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM manga;');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching manga:', error);  // This will log the error to the server console
        res.status(500).json({ error: 'Error fetching manga' });
    }
});

// Get details of a specific manga
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM manga WHERE id = $1;', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching manga details' });
    }
});

// Add a new review
router.post('/:id/reviews', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, rating, comment } = req.body;
        const result = await pool.query(
            'INSERT INTO reviews (user_id, manga_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *;',
            [userId, id, rating, comment]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error adding review' });
    }
});

export default router;
