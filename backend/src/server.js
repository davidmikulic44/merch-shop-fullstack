import express from 'express';
import serveStatic from 'serve-static';
import itemRoutes from './routes/itemRoutes.js';

const app = express();

app.use('/api', itemRoutes);

app.use(serveStatic("../../frontend/dist"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
