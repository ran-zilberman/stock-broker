import {Router} from 'express';
import {apiRoutes} from './api'

export default function() {
    const router = Router();

    router.use('/api', apiRoutes());

    router.use(function(error, req, res, next) {
        res.json({ message: error.message });
    });

    return router;
}