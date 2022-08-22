#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { PinpointWhatsappChannelStack } from '../lib/pinpoint-whatsapp-channel-stack';

const app = new cdk.App();
new PinpointWhatsappChannelStack(app, 'PinpointWhatsappChannelStack');
