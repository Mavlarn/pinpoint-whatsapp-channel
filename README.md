# Pinpoint Whatsapp channel

This is a pinpoint custom channel to deliver message with whatsapp API.

## Configure WhatsApp API webhook

TBD.

## create parameters in secretsmanager
Open AWS console, go to secretsmanager, create a secret of "Other type of secret"t, with "Key/value" :
key is `FB_APP_SECRET`, value is the app token of whatsapp. 

and remember the ARN of the secret, like `arn:aws:secretsmanager:us-east-1:111222333:secret:thesecretname`

## Deploy lambda

Clone the code, and open the file: `lib/pinpoint-whatsapp-channel-stack.ts`, and modify the code:
```typescript
    const fbSecretArn = "arn:aws:secretsmanager:us-east-1:xxx:secret:xxxxx"
```
Replace the ARN of your esecret just created.

and in line 24:
```
    FB_BUSINESS_PHONE_ID: "xxxxxxx",
```
Update the phone id (it is phone id in whatsapp, not the phone number.)

Then deploy with:
```
cdk deploy
```

Then you can get the ARN of the created lambda function. Which can be used as deliver ARN in custom channel.