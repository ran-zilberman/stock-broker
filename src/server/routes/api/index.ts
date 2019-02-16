import {Router} from 'express';
import {quanto} from './quanto';
import {wrapAsync} from '../../middlewares/wrapAsync'

export function apiRoutes() {
    const router = Router();
    
    router.get('/quanto', wrapAsync(quanto));

    return router;
}