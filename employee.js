
const AWS = require('aws-sdk');

module.exports = {
  create: async(event, context) => {
    const body = JSON.parse(event.body);
    try {
      console.log(body);
    } catch (err) {
      console.log('I am a error on the pick body hehe \n', err);
      return {
        statusCode: 400,
        body: { message: "Daaamn!"}
      }
    }
    const hasntName = (typeof body.name === 'undefined');
    const hasntEmail = (typeof body.name === 'undefined');

    if (hasntName|| hasntEmail) {
      console.log("Missing parameters");
      return {
        statusCode: 400,
        body: { message: "Daaamn!"}
      }
    }

    const employee = {
      TableName: process.env.DYNAMODB_EMPLOYEE_TABLE,
      Item: {
        name: body.name,
        email: body.email,
        company: body.company
        // password: body.password,
        // role: body.role,
        // avatar: body.avatar,
      }
    }

    try {
      const dynamodb = new AWS.DynamoDB.DocumentClient();
      const createdEmployee = await dynamodb.put(employee).promise();
      return {
        statusCode: 201,
        body: createdEmployee
      }
    } catch (err) {
      console.log('employee: ', employee);
      console.log('I am a error on the create employee hehe \n', err);
      return {
        statusCode: 500,
        body: { message: "Server needs help!"}
      }
    }

  },
  list: async(event, context) => {

  },  
  get: async(event, context) => {
    
  },
   update: async(event, context) => {
    
  },
  delete: async(event, context) => {
    
  }
}