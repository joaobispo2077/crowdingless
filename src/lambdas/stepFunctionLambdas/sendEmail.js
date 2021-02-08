const AWS = require('aws-sdk');
const SES = new AWS.SES();

exports.handler = async event => {
  console.log('event', event)
  const email = event.Input.Payload.email;

  const message = `Boa tarde, o clube dos brabos requisita que confirme o recebimento desse email para João`;
  
  const params = {
    Destination: {
        ToAddresses: [email],
    },
    Message: {
        Body: {
            Text: { Data: message },
        },
        Subject: { Data: 'Clube dos brabos' },
    },
    Source: 'joaobispo2077@gmail.com',
};

try {
    await SES.sendEmail(params).promise();
    return;
} catch (error) {
    console.log('error sending email ', error);
    throw error;
}
}