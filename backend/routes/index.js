var router = require('express').Router(),
    UserRoutes = require('./user.routes'); 

router.use('/api/user', UserRoutes);

module.exports = router;
