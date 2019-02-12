import {configure} from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';
import axios from 'axios';

configure({ adapter: new ReactSixteenAdapter() });
axios.defaults.adapter = require('axios/lib/adapters/http')
require(`jsdom-global`)(undefined, {url: `http://localhost:5554`});

