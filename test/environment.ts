import * as express from 'express';
import * as getPort from 'get-port';
import axios, { AxiosInstance } from 'axios';
import * as cors from 'cors'
import rootRouter from '../src/server/routes/index';

export interface TestEnv {
    app: express.Application;
    port: number;
    axiosInstance: AxiosInstance;
    start();
    stop();
}

export async function setupEnv() {
    let appInstance;
    const port = await getPort();
    const app = express();
    app.use(rootRouter());

    const corsOptions = {
        origin: 'http://localhost:5554'
    }    
    app.use(cors());
    
    const axiosInstance = axios.create({
        baseURL: `http://localhost:${port}/`
    });

    async function start() {
        appInstance = await app.listen(port);
    }

    async function stop() {
        await appInstance.close();
    }

    return {
        app,
        port,
        axiosInstance,
        start,
        stop
    } as TestEnv;
}