const request = require('supertest');
const app = require('../src/server');
const { User, Tour, Booking } = require('../src/models');

describe('Booking Endpoints', () => {
    let token;

    beforeAll(async () => {
        // Clear tables
        await Booking.destroy({ where: {} });
        await Tour.destroy({ where: {} });
        await User.destroy({ where: {} });

        // Create a test user
        const user = await User.create({
            email: 'test@example.com',
            password: 'password123'
        });

        // Create a test tour
        const tour = await Tour.create({
            name: 'Safari Adventure',
            price: 500.00,
            description: 'Explore the wild savannah'
        });

        // Generate a token for the user
        const jwt = require('jsonwebtoken');
        token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
    });

    it('should create a new booking', async () => {
        const res = await request(app)
            .post('/api/bookings')
            .set('Authorization', `Bearer ${token}`)
            .send({
                tourId: 'a1b2c3d4-5678-9012-3456-7e8f9a1b2c3d',
                amount: 500.00
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.status).toEqual('pending');
    });

    it('should not create a booking without authentication', async () => {
        const res = await request(app)
            .post('/api/bookings')
            .send({
                tourId: 'a1b2c3d4-5678-9012-3456-7e8f9a1b2c3d',
                amount: 500.00
            });
        expect(res.statusCode).toEqual(401);
    });
});