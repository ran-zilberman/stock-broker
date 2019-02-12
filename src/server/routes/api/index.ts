import {Router} from 'express';
import {quanto} from './quanto';

export function apiRoutes() {
    const router = Router();
    
    router.get('/quanto', quanto);

    return router;
}