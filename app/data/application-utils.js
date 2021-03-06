exports.getRejectReasons = (data) => {
  return {
    // Candidate actions
    "actions": data["actions"],
    "actions-reasons": data["actions-reasons"],
    "actions-reasons-other": data["actions-reasons-other"],
    "actions-reasons-other-improve": data["actions-reasons-other-improve"],

    // Missing qualifications
    "missing-qualifications": data["missing-qualifications"],
    "missing-qualifications-reasons": data["missing-qualifications-reasons"],
    "missing-qualifications-reasons-other": data["missing-qualifications-reasons-other"],

    // Application quality
    "application-quality": data["application-quality"],
    "application-quality-reasons": data["application-quality-reasons"],
    "application-quality-reasons-other": data["application-quality-reasons-other"],
    "application-quality-reasons-other-improve": data["application-quality-reasons-other-improve"],
    "application-quality-reasons-subject-knowledge": data["application-quality-reasons-subject-knowledge"],
    "application-quality-reasons-personal-statement": data["application-quality-reasons-personal-statement"],

    // interview performance
    "interview-performance": data["interview-performance"],
    "interview-performance-advice": data["interview-performance-advice"],

    // Course full
    "course-full": data["course-full"],

    // Other offer
    "other-offer": data["other-offer"],

    // Safeguarding
    "safeguarding": data["safeguarding"],
    "safeguarding-reasons": data["safeguarding-reasons"],
    "safeguarding-reasons-false-information": data["safeguarding-reasons-false-information"],
    "safeguarding-reasons-plagiarism": data["safeguarding-reasons-plagiarism"],
    "safeguarding-reasons-reference-information": data["safeguarding-reasons-reference-information"],
    "safeguarding-reasons-disclosed-information": data["safeguarding-reasons-disclosed-information"],
    "safeguarding-reasons-vetting-information": data["safeguarding-reasons-vetting-information"],
    "safeguarding-reasons-other": data["safeguarding-reasons-other"],

    // Another issue
    "why": data["why"],

    // Other feedback
    "other-feedback": data["other-feedback"],
    "other-feedback-details": data["other-feedback-details"],

    // Future applications
    "future-applications": data["future-applications"]
  };
}

exports.getConditions = (application) => {
  let conditions = [];
  if(application.offer && application.offer.standardConditions) {
    application.offer.standardConditions.forEach((item) => {
      conditions.push(item)
    });
  }
  if(application.offer && application.offer.conditions) {
    application.offer.conditions.forEach((item) => {
      conditions.push(item)
    });
  }
  return conditions;
};

exports.getCondition = (application, conditionId) => {
  return this.getConditions(application).find(condition => condition.id == conditionId);
};

exports.hasMetAllConditions = (application) => {
  return this.getConditions(application).filter(condition => condition.status == "Pending").length === 0;
}

exports.hasOnlyOneConditionNotMet = (application) => {
  return this.getConditions(application).filter(condition => condition.status == "Pending").length === 1;
}

exports.getFlashMessage = (options) => {
  if(options.overrideValue) {
    return options.overrideValue;
  }

  if(options.flash && options.map) {
    for (let key in options.map){
      if(options.map.hasOwnProperty(key) && options.flash[0] == key) {
        return options.map[key];
      }
    }
  }
};

exports.getTimeline = (application) => {
  let timeline = [];

  if(application.submittedDate) {
    timeline.push({
      label: {
        text:  "Application submitted"
      },
      datetime: {
        timestamp: application.submittedDate,
        type: "datetime"
      },
      byline: {
        text: "Candidate"
      },
      link: {
        text: "View application",
        href: `/application/${application.id}`
      }
    })
  }

  if(application.offer && application.offer.madeDate) {
    timeline.push({
      label: {
        text:  "Offer made"
      },
      datetime: {
        timestamp: application.offer.madeDate,
        type: "datetime"
      },
      byline: {
        text: "Alex Renato"
      },
      link: {
        text: "View offer",
        href: `/application/${application.id}/offer`
      }
    })
  }

  if(application.offer && application.offer.declinedDate) {
    timeline.push({
      label: {
        text:  "Offer declined"
      },
      datetime: {
        timestamp: application.offer.declinedDate,
        type: "datetime"
      },
      byline: {
        text: "Candidate"
      },
      link: {
        text: "View offer",
        href: `/application/${application.id}/offer`
      }
    })
  }

  if(application.rejectedDate) {
    timeline.push({
      label: {
        text:  "Application rejected"
      },
      datetime: {
        timestamp: application.rejectedDate,
        type: "datetime"
      },
      byline: {
        text: "Alex Renato"
      },
      link: {
        text: "View feedback",
        href: `/application/${application.id}`
      }
    })
  }

  if(application.withdrawnDate) {
    timeline.push({
      label: {
        text:  "Application withdrawn"
      },
      datetime: {
        timestamp: application.withdrawnDate,
        type: "datetime"
      },
      byline: {
        text: "Candidate"
      },
      link: {
        text: "View application",
        href: `/application/${application.id}`
      }
    })
  }

  if(application.offer && application.offer.acceptedDate) {
    timeline.push({
      label: {
        text:  "Offer accepted"
      },
      datetime: {
        timestamp: application.offer.acceptedDate,
        type: "datetime"
      },
      byline: {
        text: "Candidate"
      },
      link: {
        text: "View offer",
        href: `/application/${application.id}/offer`
      }
    })
  }

  if(application.offer && application.offer.conditionsMetDate) {
    timeline.push({
      label: {
        text:  "Conditions met"
      },
      datetime: {
        timestamp: application.offer.conditionsMetDate,
        type: "datetime"
      },
      byline: {
        text: "Alex Renato"
      },
      link: {
        text: "View conditions",
        href: `/application/${application.id}/offer`
      }
    })
  }

  if(application.offer && application.offer.conditionsNotMetDate) {
    timeline.push({
      label: {
        text:  "Conditions not met"
      },
      datetime: {
        timestamp: application.offer.conditionsNotMetDate,
        type: "datetime"
      },
      byline: {
        text: "Alex Renato"
      },
      link: {
        text: "View conditions",
        href: `/application/${application.id}/offer`
      }
    })
  }

  if(application.offer && application.offer.withdrawnDate) {
    timeline.push({
      label: {
        text:  "Offer withdrawn"
      },
      datetime: {
        timestamp: application.offer.withdrawnDate,
        type: "datetime"
      },
      byline: {
        text: "Alex Renato"
      },
      link: {
        text: "View offer",
        href: `/application/${application.id}/offer`
      }
    })
  }

  if(application.offer && application.offer.enrolledDate) {
    timeline.push({
      label: {
        text:  "Enrolled"
      },
      datetime: {
        timestamp: application.offer.enrolledDate,
        type: "datetime"
      },
      byline: {
        text: "Alex Renato"
      }
    })
  }

  if(application.notes && application.notes.items.length) {
    timeline.push({
      label: {
        text:  "Note added"
      },
      datetime: {
        timestamp: application.notes.items[0].date,
        type: "datetime"
      },
      byline: {
        text: "Alex Renato"
      },
      link: {
        text: "View note",
        href: `/application/${application.id}/notes/${application.notes.items[0].id}`
      }
    })
  }

  return timeline.reverse();
};
