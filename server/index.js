// Application entry point
import app from './app';

const port = parseInt(process.env.PORT, 10) || 3000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
});