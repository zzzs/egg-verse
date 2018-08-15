// app/extend/request.js
module.exports = {
  get xl() {
    return 'xl';
  },
  consoleLog() {
    console.log(this.query)
    return true;
  },
};
