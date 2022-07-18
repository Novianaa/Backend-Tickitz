const Cinema = require('../model/cinemaModel')
const helperWrapper = require('../helpers/wrapper')

module.exports = {
  addCinema: async (req, res) => {
    try {
      let { name, logo } = req.body
      logo = req.file ? req.file.filename : 'http://bppl.kkp.go.id/uploads/publikasi/karya_tulis_ilmiah/default.jpg'
      console.log(req.file)
      if (!name || !logo) {
        return helperWrapper.response(
          res, 400, `All field must filled`, null
        )
      }
      const data = { name, logo }
      const result = await Cinema.addCinema(data)
      return helperWrapper.response(res, 201, "Success create new cinema", result)
    } catch (err) {
      return helperWrapper.response(res, 200, `Bad request (${err.message})`,
        [])
    }
  }
}

