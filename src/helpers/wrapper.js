module.exports = {
  response: (response, status, msg, data) => {
    const result = {};
    result.status = status || 200;
    result.msg = msg;
    result.data = data;
    return response.status(result.status).json(result);
  },

};