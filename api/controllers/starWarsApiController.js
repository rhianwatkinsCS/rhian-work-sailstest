module.exports = {
  GetStarWarsApi: (req, res) => {
    if (req.body != null) {
      StarWarsApiService.GetStarWarsApi(req.body)
      .then(data => res.json(data) )
      .catch(data => res.badRequest(data) );
    }
    else {
      res.ok('ok!');
    }
  }
}