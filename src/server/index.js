require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')
const Immutable = require('immutable')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls


app.get('/getRoverData', async (req, res) => {
    try {
        let rover = req.get('rover');
        let images = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
            .catch((error) => {
                return error;
            });

        res.send({ images });
    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))