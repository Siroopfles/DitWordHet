import express, { Request, Response } from 'express';
import { sum } from '@ditwordhet/shared';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  const result = sum(1, 2);
  res.json({ message: 'API is running', result });
});

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
