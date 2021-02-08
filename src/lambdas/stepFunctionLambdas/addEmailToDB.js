const AWS = require('aws-sdk');

exports.handler = async event => {
  // const body = JSON.parse(event.body);
  console.log('event', event)
  const employeeData = {
    name: "teste" + new Date(),
    email: event.Input.addEmailToDB.email,
    emailable: true,
    company: "Savelivez"
  }

  const employee = {
    TableName: process.env.DYNAMODB_EMPLOYEE_TABLE,
    Item: employeeData,
    ReturnValues: 'ALL_OLD'
  }

  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const createdEmployee = await dynamodb.put(employee).promise();
    console.log(createdEmployee);
    return {
      statusCode: 201,
      email: event.Input.addEmailToDB.email
    }
  } catch (err) {
    console.log('employee: ', employee);
    console.log('I am a error on the create employee hehe \n', err);
    return {
      statusCode: 500,
      body: { message: "Server needs help!"}
    }
  }
}