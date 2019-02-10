import { linksUsers, connectClient, closeClient, mostMentionedUser } from "../mongoDB";

jest.setTimeout(120000);

beforeEach((done) => {
    connectClient().then(() => {
        done();
    });
});

afterEach(() => {
    closeClient();
})

test('Most Mentioned', (done) => {
    mostMentionedUser().then((data) => {
        console.log(data);
        expect(data).not.toBeNull();
        done();
    }).catch((err) => {
        fail(err);
    })
});

