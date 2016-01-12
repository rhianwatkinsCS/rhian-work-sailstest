module.exports = {
  GetStarWarsApi: (req, res) => {
    StarWarsApiService.GetStarWarsApi(req.body)
    .then(data => res.json(data) )
    .catch(data => res.badRequest(data) );
  }
}