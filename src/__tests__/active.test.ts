import { mostActiveUsers, connectClient, closeClient } from '../mongoDB';

jest.setTimeout(20000);

beforeEach((done) => {
    connectClient().then(() => {
        done();
    });
});

afterEach(() => {
    closeClient();
});

test('Active Users', (done) => {
    mostActiveUsers().then((data) => {
        console.log(data);
        expect(data.length).toBe(10);
        done();
    }).catch((err) => {
        fail(err);
    });
});
