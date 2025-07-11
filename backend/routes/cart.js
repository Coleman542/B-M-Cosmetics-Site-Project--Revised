import express from 'express';
import supabase from '../config/supabaseclient.js';

const router = express.Router();

// GET /api/cart - fetch all cart items with product details
router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('cart')
    .select('id, product_id, quantity, products_table (id, name, price, slug, category)');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// POST /api/cart/add - add item to cart
router.post('/add', async (req, res) => {
  const { product_id, quantity } = req.body;
  if (!product_id || !quantity) {
    return res.status(400).json({ error: 'product_id and quantity are required' });
  }
  // Upsert: if item exists, update quantity; else, insert new
  const { data, error } = await supabase
    .from('cart')
    .upsert([{ product_id, quantity }], { onConflict: ['product_id'] });
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json({ message: 'Item added to cart', data });
});

// POST /api/cart/remove - remove item from cart
router.post('/remove', async (req, res) => {
  const { product_id } = req.body;
  if (!product_id) {
    return res.status(400).json({ error: 'product_id is required' });
  }
  const { error } = await supabase.from('cart').delete().eq('product_id', product_id);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json({ message: 'Item removed from cart' });
});

export default router;
