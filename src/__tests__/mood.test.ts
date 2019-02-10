import { grumpyAndHappy, connectClient, closeClient } from "../mongoDB";

jest.setTimeout(20000);

beforeEach((done) => {
    connectClient().then(() => {
        done();
    });
});

afterEach(() => {
    closeClient();
});

test('Grumpy and Happy', (done) => {
    grumpyAndHappy().then((data) => {
        console.log(data);
        expect(data).not.toBeNull();
        done();
    }).catch((err) => {
        fail(err);
    })
});
