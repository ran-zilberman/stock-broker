import {expect} from 'chai';
import {setupEnv} from '../../../../../test/environment'
import {ServerDriver} from '../../../../../test/ServerDriver'
import {QuantoResponse} from './quanto'
import axios, { AxiosResponse } from 'axios';

describe('quanto', async ()=> {

    const env = await setupEnv();
    const driver: ServerDriver = new ServerDriver(env);

    before(env.start);
    after(env.stop);

    // it('should return a response', async ()=> {
    //     return env.axiosInstance.get('/api/quanto/')
    //     .then(function (response: AxiosResponse<QuantoResponse>) {
    //         const data = response.data;
    //         expect(data.value).to.equal('quanto');
    //     });
    // });
})