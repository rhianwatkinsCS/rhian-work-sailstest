module.exports = {
  Play: (req, res) => {
    if (req.query.testy=='"brah"') {
      res.json(PlayService.Play())
    } else {
      res.json({no:"get owt!"})
    }
    /*.then(data => res.json(data) )
    .catch(data => res.badRequest(data) )*/;
  }
}