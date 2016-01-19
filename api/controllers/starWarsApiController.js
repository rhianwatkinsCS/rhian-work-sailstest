module.exports = {
  GetStarWarsApi: (req, res) => {

    //if (req.body != null && req.body.token == process.env.RHIAN_JUST_MESSING_ABOUT) {
      StarWarsApiService.GetStarWarsApi(req.body)
      .then(data => res.json(data) )
      .catch(data => res.badRequest(data) );
    // }
    // else {
    //   res.ok('Missing data in request.');
    // }
  }
}