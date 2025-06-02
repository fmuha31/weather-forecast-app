import fs from 'fs'
import express from 'express'
import fetch from 'node-fetch'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express()
const port = 3000
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'docs')))
app.use(express.json())
app.post('/getWeather', async (req, res) => {
    try {
        const zip = req.body.search;
        const appid = 'c9485b9500afd8643e990f0faacd41ab';
        const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${appid}&units=imperial`;

        // fetch weather data inside the route handler
        const apiRes = await fetch(url);
        if (!apiRes.ok) {
        return res.status(apiResponse.status).json({ error: 'Failed to fetch weather data' });
        }
        const data = await apiRes.json();

        // creates and save to weather.json
        fs.writeFileSync('weather.json', JSON.stringify(data, null, 2));

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(port, () => {console.log(`Server running at https://localhost:${port}`)});
