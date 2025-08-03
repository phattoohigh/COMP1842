const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
global.Vocab = require('./api/models/vocabModel');
const routes = require('./api/routes/vocabRoutes');
const authRoutes = require('./api/routes/authRoutes');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://phatthgcs230204:phatdeptrai@fgwweb2.9bxa5ix.mongodb.net/?retryWrites=true&w=majority&appName=FGWWeb2',
    { useNewUrlParser: true }
);

const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);
app.use('/api/auth', authRoutes);

app.listen(port);
app.use((req, res) => {
    res.status(404).send({ url: `${req.originalUrl} not found` });
});
console.log(`Server started on port ${port}`);