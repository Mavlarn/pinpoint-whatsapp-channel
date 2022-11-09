// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const https = require('https')
const AWS = require('aws-sdk')

const BUSINESS_PHONE_ID = process.env.FB_BUSINESS_PHONE_ID

const PATH_WHATSAPP = '/v14.0/' + BUSINESS_PHONE_ID + '/messages'
let appToken

const secretManager = new AWS.SecretsManager()

const sendWhatsAppTemplateMessage = async (phoneId, templateName, templateParams) => {

  if (appToken === undefined) {
    await getFacebookSecrets()
  }
  
  const body = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: phoneId,
    type: 'template',
    template: {
      name: templateName,
      language: { code: "en_US" },
      components: templateParams
    }
  }
  console.log('Send FB WhatsApp body', body)
  const headers = {
    Authorization: 'Bearer ' + appToken,
    'Content-Type': 'application/json'
  }

  const options = {
    host: 'graph.facebook.com',
    path: PATH_WHATSAPP,
    method: 'POST',
    headers
  }

  const result = await new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseBody = ''
      res.on('data', (chunk) => {
        responseBody += chunk
      })

      res.on('end', () => {
        resolve(responseBody)
      })
    })

    req.on('error', (err) => {
      console.error('Error sending FB WhatsApp message', err)
      reject(err)
    })

    req.write(JSON.stringify(body))
    req.end()
  })

  const resultObj = JSON.parse(result)
  console.log('Send FB WhatsApp Message result', result)

  if (resultObj.error !== undefined) {
    console.error('Error sending FB WhatsApp message', resultObj)
    return false
  }
  return true
}

const getFacebookSecrets = async () => {
  if (process.env.FB_SECRET_ARN) {
    const params = {
      SecretId: process.env.FB_SECRET_ARN
    }
    const response = await secretManager.getSecretValue(params).promise()
    const sec = JSON.parse(response.SecretString)
    appToken = sec.FB_APP_TOKEN
  } else {
    appToken = null
  }
}

module.exports = { sendWhatsAppTemplateMessage }
