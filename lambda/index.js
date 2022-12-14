const { sendWhatsAppTemplateMessage } = require('./facebook')

exports.handler = async (event) => {
  console.log('Event', event)

  if (event.Endpoints === undefined) {
    const errorText = 'Unsupported event type. event. Endpoints not defined.'
    console.error(errorText)
    throw new Error(errorText)
  }

  const endpoints = event.Endpoints
  for (var endpointId in endpoints) {
    const endpoint = endpoints[endpointId]
    const phoneId = endpoint.Address
    const customMessage = JSON.parse(event.Data)
    // customMessage format:  { templateName: formData.templateName, params: templateParams }
    const templateName = customMessage.templateName
    const templateParams = customMessage.params
    await sendWhatsAppTemplateMessage(phoneId, templateName, templateParams)
  }
}

/*

/*
 * Example SBS playload:
{
  "Message":{},
  "Data":"The payload that's provided in the CustomMessage object in MessageConfiguration",
  "ApplicationId":"3a9b1f4e6c764ba7b031e7183example",
  "CampaignId":"13978104ce5d6017c72552257example",
  "TreatmentId":"0",
  "ActivityId":"575cb1929d5ba43e87e2478eeexample",
  "ScheduledTime":"2020-04-08T19:00:16.843Z",
  "Endpoints":{
    "1dbcd396df28ac6cf8c1c2b7fexample":{
      "ChannelType":"EMAIL",
      "Address":"mary.major@example.com",
      "EndpointStatus":"ACTIVE",
      "OptOut":"NONE",
      "Location":{
        "City":"Seattle",
        "Country":"USA"
      },
      "Demographic":{
        "Make":"OnePlus",
        "Platform":"android"
      },
      "EffectiveDate":"2020-04-01T01:05:17.267Z",
      "Attributes":{
        "CohortId":[
          "42"
        ]
      },
      "CreationDate":"2020-04-01T01:05:17.267Z"
    }
  }
}


*/
