const express = require('express');
const sequelize = require('./config/db');
const app = express();
const PORT = 3000;
const router = require('./router/router');

app.use(express.json());
app.use('/uploads', express.static('./uploads'));
app.set('view engine', 'ejs');
app.use("/api", router);

sequelize.sync()
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, '192.168.1.46', () => {
            console.log(`Server is running on http://192.168.1.46:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error syncing database:', err);
    });
process.on('SIGINT', async () => {
    console.log("Server is shutting down...");
    await sequelize.close(); 
    process.exit(0);  
});
