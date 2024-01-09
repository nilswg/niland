import { Hello } from '../';

beforeEach(() => {
    jest.spyOn(console, 'log');
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Test', () => {
    it('test helloWorld2', () => {
        let s = new Hello().sayHello();
        expect(console.log).toBeCalledTimes(2);
    });
});
