import express from 'express';
import routes from './router.js';
import cors from 'cors';

const app = express();
const port = 3001;

// Middleware untuk parsing JSON body
app.use(express.json());
app.use(cors());

app.use('/', routes);
 
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});