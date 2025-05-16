const apiKey = '9a170deb78dd841e008b2b6adf32ca7a'; 

        document.getElementById('weatherForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const city = document.getElementById('cityInput').value.trim();
            if (!city) return;
            document.getElementById('weatherInfo').innerHTML = '';
            document.getElementById('errorMsg').textContent = '';
            fetchWeather(city);
        });

        function fetchWeather(city) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`)
                .then(response => {
                    if (!response.ok) throw new Error('City not found');
                    return response.json();
                })
                .then(data => {
                    const temp = data.main.temp;
                    const humidity = data.main.humidity;
                    const wind = data.wind.speed;
                    document.getElementById('weatherInfo').innerHTML = `
                        <p><span class="label">Temperature:</span> ${temp} &deg;C</p>
                        <p><span class="label">Humidity:</span> ${humidity} %</p>
                        <p><span class="label">Wind Speed:</span> ${wind} m/s</p>
                    `;
                })
                .catch(err => {
                    document.getElementById('errorMsg').textContent = err.message;
                });
        }