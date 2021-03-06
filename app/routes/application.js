var uuid = require('uuid/v4');
const utils = require( '../data/application-utils')

module.exports = router => {

  router.get('/application/:applicationId', (req, res) => {
    const success = req.query.success
    const applicationId = req.params.applicationId
    const application = req.session.data.applications[applicationId]

    var flashMessage = utils.getFlashMessage({
      flash: req.flash('success'),
      overrideValue: req.query.flash,
      map: {
        'offer-withdrawn': 'Offer successfully withdrawn',
        'conditions-met': 'Conditions successfully marked as met',
        'conditions-not-met': 'Conditions successfully marked as not met',
        'enrolled': 'Candidate successfully enrolled',
        'offered': 'Offer successfully made',
        'rejected': 'Application successfully rejected',
        'change-offer-location': 'Offer successfully changed ',
        'change-offer-course': 'Offer successfully changed ',
        'change-offer-provider': 'Offer successfully changed ',
        'change-condition-status-to-met': 'Condition successfully updated to met',
        'change-condition-status-to-not-met': 'Condition successfully updated to not met',
        'offer-made-to-new-provider': 'Offer successfully made',
        'offer-made-to-new-course': 'Offer successfully made',
        'offer-made-to-new-location': 'Offer successfully made'
      }
    })

    res.render('application/index', {
      applicationId: applicationId,
      // timeline: utils.getTimeline(application),
      // conditions: utils.getConditions(application),
      status: req.query.status,
      success,
      flash: flashMessage
    })
  })

  router.get('/application/:applicationId/offer', (req, res) => {
    const applicationId = req.params.applicationId
    const application = req.session.data.applications[applicationId]

    const flashMessage = utils.getFlashMessage({
      flash: req.flash('success'),
      overrideValue: req.query.flash,
      map: {
        'offer-withdrawn': 'Offer successfully withdrawn',
        'conditions-met': 'Conditions successfully marked as met',
        'conditions-not-met': 'Conditions successfully marked as not met',
        'enrolled': 'Candidate successfully enrolled',
        'offered': 'Offer successfully made',
        'rejected': 'Application successfully rejected',
        'change-offer-location': 'Offer successfully changed ',
        'change-offer-course': 'Offer successfully changed ',
        'change-offer-provider': 'Offer successfully changed ',
        'change-condition-status-to-met': 'Condition successfully updated to met',
        'change-condition-status-to-not-met': 'Condition successfully updated to not met',
        'offer-made-to-new-provider': 'Offer successfully made',
        'offer-made-to-new-course': 'Offer successfully made',
        'offer-made-to-new-location': 'Offer successfully made'
      }
    })

    res.render('application/offer', {
      applicationId: applicationId,
      conditions: utils.getConditions(application),
      flash: flashMessage
    })
  })

  router.get('/application/:applicationId/timeline', (req, res) => {
    const applicationId = req.params.applicationId
    const application = req.session.data.applications[applicationId]

    res.render('application/timeline', {
      applicationId: applicationId,
      timeline: utils.getTimeline(application),
      conditions: utils.getConditions(application)
    })
  })

  router.get('/application/:applicationId/decision', (req, res) => {
    res.render(`application/decision`, {
      applicationId: req.params.applicationId
    })
  })

  router.post('/application/:applicationId/decision', (req, res) => {
    const applicationId = req.params.applicationId
    const { decision } = req.body

    if (decision === 'offer') {
      res.redirect(`/application/${applicationId}/offer/new`)
    } else if (decision === 'different-course') {
      res.redirect(`/application/${applicationId}/new/change-course`)
    } else if (decision === 'different-location') {
      res.redirect(`/application/${applicationId}/new/change-location`)
    } else if (decision === 'different-provider') {
      res.redirect(`/application/${applicationId}/new/change-provider`)
    } else {
      res.redirect(`/application/${applicationId}/reject`)
    }
  })

}
