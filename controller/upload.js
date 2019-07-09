const uploadUtil = require('../utils/upload')

async function upload (req, res, next) {
  try {
    const token = await uploadUtil()
    res.json({
      code: 200,
      token
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  upload
}