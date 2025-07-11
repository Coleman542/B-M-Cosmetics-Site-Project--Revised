import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';
import cartRouter from './routes/cart.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API route for products
app.use('/api/products', productsRouter);
// API route for cart
app.use('/api/cart', cartRouter);

app.get('/', (req, res) => {
  res.send('B&M Cosmetics API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
