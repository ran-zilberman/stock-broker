import {Router} from 'express';
import {apiRoutes} from './api'

export default function() {
    const router = Router();
    
    router.get('/blah', function (req, res) {
        const b = req;
        res.send('Birds home page');
    });

    router.use('/api', apiRoutes());

    return router;
}