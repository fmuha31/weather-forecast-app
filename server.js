import fs from 'fs'
import express from 'express'
import fetch from 'node-fetch'
import path from 'path'
import {fileURLToPATH} from 'url';

const app = express()
const port = 3000
const __dirname = path.dirname(fileURLToPATH(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.post('/getWeather', async (req, res) => {
    const zip = req.body.search
    const appid = 'c9485b9500afd8643e990f0faacd41ab'
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${appid}&units=imperial`;
});

const api = await fetch(url)
const data = await api.json();

// creates and save to weather.json
fs.writeFileSync('weather.json', JSON.stringify(data, null, 2))
res.json(data)
app.listen(port, () => {console.log(`Server running at https://localhost:${port}`)});