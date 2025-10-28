import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import routes from './app/routes';
import globalErrorHandler from '@middlewares/globalErrorHandler';
import config from './config';

const app: Application = express();

app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());

//
app.use('/api/auth', routes);

// Define a simple route
app.get('/api/auth/users/create-admin', (req: Request, res: Response) => {
  res.send('Hello, from auth!');
});
//global error handler
app.use(globalErrorHandler);

//handle not found
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res.status(404).json({
//     success: false,
//     message: "Not Found",
//     errorMessages: [
//       {
//         path: req.originalUrl,
//         message: "API Not Found in auth",
//       },
//     ],
//   });
//   next();
// });

// Start the server and export the server instance
const server = app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});

export default app;
