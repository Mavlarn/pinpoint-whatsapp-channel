

const sendMetrics = async (event) => {
    customEndpoints = 0
    smsEndpoints = 0
    pushEndpoints = 0
    emailEndpoints = 0
    voiceEndpoints = 0
    numEndpoints = len(event['Endpoints'])
    
    console.log("Endpoints in payload: " + numEndpoints)

    endpoints = event['Endpoints']
    for (endpointId in endpoints) {
        
        const endpoint = endpoints[endpointId]
        if(endpoint['ChannelType'] == "CUSTOM")
            customEndpoints += 1
        else if(endpoint['ChannelType'] == "SMS")
            smsEndpoints += 1
        else if(endpoint['ChannelType'] == "EMAIL")
            emailEndpoints += 1
        else if(endpoint['ChannelType'] == "VOICE")
            voiceEndpoints += 1
        else{
            pushEndpoints += 1
        }
    }
            
    response = cloudwatch.put_metric_data(
        MetricData = [
            {
                'MetricName': 'EndpointCount',
                'Dimensions': [
                    { 'Name': 'CampaignId', 'Value': event['CampaignId'] },
                    { 'Name': 'ApplicationId', 'Value': event['ApplicationId'] }
                ],
                'Unit': 'None',
                'Value': numEndpoints
            },
            {
                'MetricName': 'CustomCount',
                'Dimensions': [
                    { 'Name': 'CampaignId', 'Value': event['CampaignId'] },
                    { 'Name': 'ApplicationId', 'Value': event['ApplicationId'] }
                ],
                'Unit': 'None',
                'Value': customEndpoints
            },
            {
                'MetricName': 'SMSCount',
                'Dimensions': [
                    { 'Name': 'CampaignId', 'Value': event['CampaignId'] },
                    { 'Name': 'ApplicationId', 'Value': event['ApplicationId'] }
                ],
                'Unit': 'None',
                'Value': smsEndpoints
            },
            {
                'MetricName': 'EmailCount',
                'Dimensions': [
                    { 'Name': 'CampaignId', 'Value': event['CampaignId'] },
                    { 'Name': 'ApplicationId', 'Value': event['ApplicationId'] }
                ],
                'Unit': 'None',
                'Value': emailEndpoints
            },
            {
                'MetricName': 'VoiceCount',
                'Dimensions': [
                    { 'Name': 'CampaignId', 'Value': event['CampaignId'] },
                    { 'Name': 'ApplicationId', 'Value': event['ApplicationId'] }
                ],
                'Unit': 'None',
                'Value': voiceEndpoints
            },
            {
                'MetricName': 'PushCount',
                'Dimensions': [
                    { 'Name': 'CampaignId', 'Value': event['CampaignId'] },
                    { 'Name': 'ApplicationId', 'Value': event['ApplicationId'] }
                ],
                'Unit': 'None',
                'Value': pushEndpoints
            }
        ],
        Namespace = 'PinpointCustomChannelExecution'
    )
    console.log("cloudwatchResponse:\n", response)
}
module.exports = { handler }
