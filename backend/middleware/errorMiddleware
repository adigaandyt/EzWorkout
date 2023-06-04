//Custom error handler
//must include err req res next in order to fire off as an error
const errHandler = (err, req, res, next) => {
  //If the res status exists (set before throwing an error)
  //then use it, else set it to 500
  const statusCode = res.statusCode ? res.statusCode : 500
  res.status(statusCode)
  res.json({
    message: err.message,
    //Send the stack trace if we are not in production
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = {
  errHandler,
}
