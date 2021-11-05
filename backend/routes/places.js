import express from 'express';
import verifyToken from './auth.js';
import axios from 'axios';

const place = express.Router();

// --- Verify Token ---

place.use('/', async (req, res, next) => {
    try {
        let token = verifyToken(req.body.token);
        if (token === false) {
            res.json({message: 'Invalid user token received.'});
        } else {
            next();
        }
    } catch (err) {
        console.error(err);
        res.json({error: err});
    }

});

// -- Get Nearest Store ---
// token
// coordinates (format: 'latitude,longitude')
place.post('/', async (req, res) => {
    const config = {
        method: 'get',
        url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
                     + req.body.coordinates
                     + '&radius=10'
                     + '&key=' + process.env.GOOGLE_MAPS_API_KEY,
        headers: { }
    };

    axios(config).then((res) => {
        console.log(JSON.stringify(res.data));
    }).catch((err) => { console.log(err) })
})

export default place;