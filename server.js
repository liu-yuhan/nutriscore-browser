const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors')

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json({ extended: false }));
app.use(cors())


app.get('/', (req, res) => {
  res.send('Server OK');
});
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/product', require('./routes/api/products'));


module.exports=app.listen(PORT, () => {
  console.log(`Server Listening on port ${PORT}`);
});
