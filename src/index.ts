import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/users.router';
import { spaceshipRouter } from './routers/spaceship.router';
import { sessionMiddleware } from './middleware/session.middleware';
import { loginRouter } from './routers/login.router';

const app = express();

app.use((req, res, next) => {
  console.log(`request made with url: ${req.url} and method: ${req.method}`);
  const headers = req.rawHeaders;
  console.log(headers);
  next();
});

app.use(bodyParser.json());

app.use(sessionMiddleware);

/**
 * Register Routers
 */
app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/spaceships', spaceshipRouter);

app.listen(8080);
console.log('end of index');