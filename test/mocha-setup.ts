import {configure} from 'enzyme';
import * as ReactSixteenAdapter from 'enzyme-adapter-react-16';

const baseURL = `http://localhost:5554`;

configure({ adapter: new ReactSixteenAdapter() });

require(`jsdom-global`)(undefined, {url: baseURL});
