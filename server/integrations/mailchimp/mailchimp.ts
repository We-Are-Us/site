import * as Mailchimp from 'mailchimp-api-v3';
import config from '../../config';

const mailchimpClient = new Mailchimp(config.get('mailchimp.apiKey'));
