const applications = require('./applications')

module.exports = {
  applications,
  bare: process.env.BARE,
  flags: {
    interview_preferences: true
  }
}
