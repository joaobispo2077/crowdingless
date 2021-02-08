const AWS = require('aws-sdk');

exports.handler = async event => {
  // const params = event.pathParameters;
  console.log('event', event)
  const employeeSearch = {
    TableName: process.env.DYNAMODB_EMPLOYEE_TABLE,
    Key: {
      email: event.Input.Payload.email // or event.pathParameters.email
    }
  }

  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const employeeData = await dynamodb.get(employeeSearch).promise();

    const employee = employeeData.Item;
    const isNullEmployee = (employee === null);

    if (isNullEmployee) return { statusCode: 404 }
    

    return {
      statusCode: 200,
      email: event.Input.Payload.email
    }

  } catch (err) {
    console.log('employeeSearch: ', employeeSearch);
    console.log('Im error on the get employee \n', err);

    return {
      statusCode: 500
    }
  }
}