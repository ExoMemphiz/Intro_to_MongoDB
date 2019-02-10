import express from 'express';
import bodyParser from 'body-parser'
import twitterRoute from './routes/twitterRoute';
import { connectClient } from './mongoDB'

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Use the /twitter URL to access the methods!");
})

app.use('/twitter', twitterRoute)

app.listen(3000, async () => {
    try {
        await connectClient();
        console.log('Twitter App listening on port 3000!');
    } catch (err) {
        console.error(err);
    }
});
