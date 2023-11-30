const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const productRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const ordersRouter = require('./routes/order');
const cartRouter = require('./routes/cart');
const favoriteRouter = require('./routes/favo');
const paymentRoutes = require('./routes/payment');

const app = express()
const port = 3000
app.use(cors());
dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(() => console.log('DB Connectted')).catch((err) => console.log(err));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/api/products', productRouter)
app.use('/api/', authRouter)
app.use('/api/users', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/favorite', favoriteRouter)
app.use('/api/payments', paymentRoutes);

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`))