require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))
// console.log(process.env);

// your API calls

// example API call
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())

        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})

app.get('/apods', async (req, res) => {
    try {
        console.log('Calling NASA API');
        let rover = req.get('rover');
        console.log('rover: ' + rover);
        let images = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1&api_key=${process.env.API_KEY}`)
            .then(res => res.json())

        res.send({ images })
    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))