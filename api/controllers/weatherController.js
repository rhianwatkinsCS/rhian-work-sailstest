module.exports = {
  GetWeather: (req, res) => {
    WeatherService.GetWeather()
    .then(data => res.json(data) )
    .catch(data => res.badRequest(data) );
  }
}