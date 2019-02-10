import express from 'express';
import { distinctUsers, linksUsers, mostActiveUsers, grumpyAndHappy, mostMentionedUser } from '../mongoDB';

const router = express.Router();

router.get('/', (req, res) => {
    res.send(`<p>The following methods are available for usage:</p> 
             <a href="/twitter/getDistinctUsers">/getDistinctUsers</a>
             <br><br> <a href="/twitter/getTopLinkers">/getTopLinkers</a>
             <br><br> <a href="/twitter/getMostMentioned">/getMostMentioned</a> (Very, very slow, 1+ minutes)
             <br><br> <a href="/twitter/getMostActive">/getMostActive</a>
             <br><br> <a href="/twitter/getGrumpyHappy">/getGrumpyHappy</a>
            `);
});

router.get('/getDistinctUsers', (req, res) => {
    distinctUsers().then((users) => {
        res.json(users);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/getTopLinkers', (req, res) => {
    linksUsers().then((users) => {
        res.json(users);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/getMostMentioned', (req, res) => {
    mostMentionedUser().then((users) => {
        res.json(users);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/getMostActive', (req, res) => {
    mostActiveUsers().then((users) => {
        res.json(users);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/getGrumpyHappy', (req, res) => {
    grumpyAndHappy().then((users) => {
        res.json(users);
    }).catch((err) => {
        res.json(err);
    });
});

export default router;

