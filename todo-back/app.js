"use strict";
(async () => {
    require('dotenv').config();
    await require('./models').configure();

    const express = require('express');
    const cors = require('cors');
    const routes = require('./routes');

    const app = express();
    app.use(cors())
    const PORT = process.env.PORT || 3000;

    app.use(express.urlencoded({ extended: false }));
    app.use('/api', routes);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})();