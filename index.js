const express = require('express');
const sequelize = require('./config/db');
const app = express();
const PORT = 3000;
const router = require('./router/router');
const cors = require('cors');

// ✅ CORS middleware should be declared early
app.use(cors({
    origin: '*', // or use specific IP: 'http://192.168.0.97:8080'
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Middleware & static files
app.use(express.json());
app.use('/uploads', express.static('./uploads'));
app.set('view engine', 'ejs');

// ✅ Router must come after middleware
app.use("/api", router);

// ✅ Sync database and start server
sequelize.sync()
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, '0.0.0.0', () => {
            console.log('Server is running on http://192.168.118.177:${PORT}');
        });
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });

// ✅ Graceful shutdown
process.on('SIGINT', async () => {
    console.log("Server is shutting down...");
    await sequelize.close(); 
    process.exit(0);  
});