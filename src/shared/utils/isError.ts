const isError = statusCode => {
  const statusCodePrefix = statusCode && (statusCode + '')[0];
  if (statusCodePrefix && ['4', '5'].indexOf(statusCodePrefix) !== -1) {
    return true;
  }

  return false;
};

export default isError;
