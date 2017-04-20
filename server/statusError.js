// status error
// msg
// status
function StatusError(msg, status) {
    // err, error call
    // this msg
    var err = Error.call(this, msg);
    // err status = status
    err.status = status;
    // erro name === statusError
    err.name = 'StatusError';
    // return error
    return err;
}

// .prototype
// object.create
// error.prototype
// merge with constructor, value StatusError above
StatusError.prototype = Object.create(Error.prototype, {
  constructor: { value: StatusError }
});

// module exports StatusError
module.exports = StatusError;
