async function getWeather() {
    const zipcode = document.getElementById('search').value;
    const res = await fetch('/getWeather', {
        method: "POST",
        headers: {'Content-Type': '/application/json'},
        body: JSON.stringify({zip}),
    })

    const data = await res.json();
    const out = document.getElementById('out');
    out.innerHTML = '<h1>The weather for ${data.name}</h1>'
    out.innerHTML += '<p>Today there is a High of  ${data.main.temp_max} with a low of ${data.main.temp_min}. I feels like ${data.main.feel_like}</p>'
}