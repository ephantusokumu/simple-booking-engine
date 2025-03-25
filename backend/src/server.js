
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const rateLimit = require('express-rate-limit');
const paymentController = require('./controllers/paymentController'); // Adjust path as needed


// Implementing Rate limiters - This is an extra feature not on quiz
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.',
});


const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: 'Too many login attempts, please try again later.',
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);

app.post(
    '/stripe-webhook',
    express.raw({ type: 'application/json' }),
    paymentController.handleWebhook
);

app.post(
    '/create-payment-session',
    express.json(),
    paymentController.createPaymentSession
);


sequelize
    .authenticate()
    .then(() => {
        //if you see this, the setup is almost complete
        console.log('Good Job Champion....Database connected');
        return sequelize.sync({ alter: true });
    })
    .catch((err) => {
        console.error('Connection error:', err);
        process.exit(1);
    });

app.use('/api/auth/login', loginLimiter);

app.use('/api', routes);



// Route for Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));