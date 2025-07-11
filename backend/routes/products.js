import express from 'express';
import supabase from '../config/supabaseclient.js';

const router = express.Router();

// GET /api/products - fetch all products
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('products_table').select('*');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// You can add more routes here (e.g., GET by id, POST, etc.)

export default router;
