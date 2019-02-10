import { linksUsers, connectClient, closeClient } from "../mongoDB";

jest.setTimeout(15000);

beforeEach((done) => {
    connectClient().then(() => {
        done();
    });
});

afterEach(() => {
    closeClient();
})

test('Links Users', (done) => {
    linksUsers().then((data) => {
        console.log(data);
        expect(data).not.toBeNull();
        done();
    }).catch((err) => {
        fail(err);
    })
});
