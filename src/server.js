const app = require('./app'), PORT = process.env.PORT || 80;

app.listen(PORT, err => { err ? console.error(err) : console.log(`Server is Running at Port: ${PORT}`) });