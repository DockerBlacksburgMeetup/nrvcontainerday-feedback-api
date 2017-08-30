import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import api from "./api";
import cors from "cors";
import url from "url";

const app = express();

app.use(cors({ origin : (origin, callback) => {
  const allowed = (origin === undefined || url.parse(origin).hostname === "localhost");
  if (allowed) callback(null, true);
  else callback(new Error("Only localhost is allowed"));
}}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.output) {
    res.status(err.output.statusCode || 500);
    res.json(err.output.payload);
  }
  else {
    res.status(err.statusCode || 500);
    res.json({ error: "An error has occurred" });
  }

  // render the error page
});

export default app;
