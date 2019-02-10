import { distinctUsers, connectClient, closeClient } from '../mongoDB';

jest.setTimeout(60000);

beforeEach((done) => {
    connectClient().then(() => {
        done();
    });
});

afterEach(() => {
    closeClient();
});

test('Distinct Users', (done) => {
    distinctUsers().then((data) => {
        expect(data.length).toBeGreaterThan(67000);
        done();
    }).catch((err) => {
        fail(err);
    });
});
