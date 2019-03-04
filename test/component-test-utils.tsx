import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import * as MomentUtils from "@date-io/moment";

export interface TestkitFactoryArgs {
    wrapper: ReactWrapper;
    dataHook?: string;
}

export function getProps<T extends Object>(getDefaults: () => T) {
    return (overrides: Partial<T> = {}): T =>
        Object.assign({}, getDefaults(), overrides);
}

function getComponent({wrapper, dataHook}: TestkitFactoryArgs) {
    return dataHook ? wrapper.find(`[data-hook="${dataHook}"]`) : wrapper;
}

export function makeRenderer<T>(
    Comp: React.ComponentType<T>,
    defaults?: T
    ) {
    return (props: Partial<T> = {}) => {
        return mount(<MuiPickersUtilsProvider utils={MomentUtils}>
                        <Comp {...defaults} {...props} />
                     </MuiPickersUtilsProvider>);
    };
}

export function makeDriverFactory<T>(maker: (component: ReactWrapper) => T) {
    return (args: TestkitFactoryArgs) => {
        const component = getComponent(args);
        return maker(component);
    };
}
