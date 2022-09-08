import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'

import * as path from 'path';

export class PinpointWhatsappChannelStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fbSecretArn = "arn:aws:secretsmanager:us-east-1:xxx:secret:xxxxx"
    const customPinPointHandler = new NodejsFunction(
      this,
      'customPinPointHandler',
      {
        runtime: lambda.Runtime.NODEJS_16_X,
        entry: path.resolve(__dirname, '../lambda/index.js'),
        handler: 'handler',
        timeout: Duration.seconds(30),
        memorySize: 512,
        environment: {
          FB_BUSINESS_PHONE_ID: "xxxxxxx",
          FB_SECRET_ARN: fbSecretArn
        },
      }
    );
    customPinPointHandler.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['secretsmanager:GetSecretValue'],
        resources: [fbSecretArn],
        effect: iam.Effect.ALLOW,
      })
    )
    // "arn:aws:mobiletargeting:us-east-1:568765279027:apps/*"
    customPinPointHandler.addPermission('pinpoint_permission', {
      principal: new iam.ServicePrincipal("pinpoint.amazonaws.com"),
      action: "lambda:InvokeFunction",
      sourceArn: `arn:aws:mobiletargeting:${Stack.of(this).region}:${Stack.of(this).account}:apps/*`
    })
  }
}
