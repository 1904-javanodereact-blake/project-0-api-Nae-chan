import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/user-router';
import { spaceshipRouter } from './routers/spaceship-router';
import { sessionMiddleware } from './middleware/session.middleware';
import { usersArray } from './usersArray';

const app = express();

app.use((req, res, next) => {
  console.log(`request made with url: ${req.url} and method: ${req.method}`);
  const headers = req.rawHeaders;
  console.log(headers);
  next();
});

app.use(bodyParser.json());

app.use(sessionMiddleware);

app.post('/', (req, res) => {
  const { username, password } = req.body;
  const user = usersArray.find(u => u.username === username && u.password === password); //TODO: Replace with DB

  if (user) {
    // attach the user data to the session object
    req.session.user = user;
    res.end();
  } else {
    res.sendStatus(401);
  }
})



/**
 * Register Routers
 */
app.use('/users', userRouter);
app.use('/spaceships', spaceshipRouter);

app.listen(8080);
console.log('end of index');