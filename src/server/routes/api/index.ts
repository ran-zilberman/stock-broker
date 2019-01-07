import {Router} from 'express';

export default function() {
    const router = Router();
    
    router.get('/quanto', function (req, res) {
        const b = req;
        res.send('Birds home page');
    });

    return router;
}