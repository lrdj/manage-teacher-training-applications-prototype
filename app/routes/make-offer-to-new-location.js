var uuid = require('uuid/v4');

module.exports = router => {

  router.get('/application/:applicationId/new/change-location', (req, res) => {
    res.render(`offer/new/change-location/location`, {
      applicationId: req.params.applicationId
    })
  })

  router.post('/application/:applicationId/new/change-location', (req, res) => {
    res.redirect(`/application/${req.params.applicationId}/new/change-location/conditions`)
  })

  router.get('/application/:applicationId/new/change-location/conditions', (req, res) => {
    res.render(`offer/new/change-location/conditions`, {
      applicationId: req.params.applicationId
    })
  })

  router.post('/application/:applicationId/new/change-location/conditions', (req, res) => {
    res.redirect(`/application/${req.params.applicationId}/new/change-location/confirm`)
  })

  router.get('/application/:applicationId/new/change-location/confirm', (req, res) => {

    let standardConditions = req.session.data['standard-conditions'].map((item) => {
      return {
        description: item
      }
    })

    let furtherConditions = [];

    if (req.session.data['condition-1']) {
      furtherConditions.push({ description: req.session.data['condition-1'] })
    }
    if (req.session.data['condition-2']) {
      furtherConditions.push({ description: req.session.data['condition-2'] })
    }
    if (req.session.data['condition-3']) {
      furtherConditions.push({ description: req.session.data['condition-3'] })
    }
    if (req.session.data['condition-4']) {
      furtherConditions.push({ description: req.session.data['condition-4'] })
    }

    let recommendations = req.session.data.recommendations
    res.render(`offer/new/change-location/confirm`, {
      applicationId: req.params.applicationId,
      conditions: standardConditions.concat(furtherConditions)
    })
  })

  router.post('/application/:applicationId/new/change-location/confirm', (req, res) => {
    const applicationId = req.params.applicationId
    const application = req.session.data.applications[applicationId]
    application.status = 'Offered';
    application.offer = {
      madeDate: new Date().toISOString()
    };

    application.offer.standardConditions = req.session.data['standard-conditions'].map((item) => {
      return {
        id: uuid(),
        description: item,
        status: 'Pending'
      }
    })

    const conditions = []
    if (req.session.data['condition-1']) {
      conditions.push({ id: uuid(), description: req.session.data['condition-1'], status: 'Pending' })
    }
    if (req.session.data['condition-2']) {
      conditions.push({ id: uuid(), description: req.session.data['condition-2'], status: 'Pending' })
    }
    if (req.session.data['condition-3']) {
      conditions.push({ id: uuid(), description: req.session.data['condition-3'], status: 'Pending' })
    }
    if (req.session.data['condition-4']) {
      conditions.push({ id: uuid(), description: req.session.data['condition-4'], status: 'Pending' })
    }
    application.offer.conditions = conditions;

    application.offer.recommendations = req.session.data.recommendations
    req.flash('success', 'offer-made-to-new-location')
    res.redirect(`/application/${req.params.applicationId}/offer`)
  })
}
