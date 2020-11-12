
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

    if (hasntName || hasntEmail) {
      console.log("Missing parameters");
      return {
        statusCode: 400,
        body: { message: "Daaamn!"}
      }
    } 
    const employeeData = {
      name: body.name,
      email: body.email,
      company: body.company
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
        body: JSON.stringify(createdEmployee.Attributes)
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
    const employeeSearch = {
      TableName: process.env.DYNAMODB_EMPLOYEE_TABLE
    }

    try {
      const dynamodb = new AWS.DynamoDB.DocumentClient();
      const employees = await dynamodb.scan(employeeSearch).promise();

      const isNull = (employees.Items === null);
      const isNotAnArray = (!Array.isArray(employees.Items));
      const hasntData = (employees.length === 0);

      if (isNull || isNotAnArray || hasntData) {
        return {
          statusCode: 404
        }
      }

      return {
        statusCode: 200,
        body: JSON.stringify(employees.Items.map(employee => {
          return {
            name: employee.name,            
            email: employee.email,
            company: employee.company
          }
        }))
      }

    } catch (err) {
      console.log('employeeSearch: ', employeeSearch);
      console.log('I am a error on the create employee hehe \n', err);
      return {
        statusCode: 500,
        body: { message: "Server needs help!"}
      }
    }
      
    
    
  },  
  get: async(event, context) => {
    const params = event.pathParameters;
    const employeeSearch = {
      TableName: process.env.DYNAMODB_EMPLOYEE_TABLE,
      Key: {
        email: params.email // or event.pathParameters.email
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
        body: JSON.stringify(employee)
      }

    } catch (err) {
      console.log('employeeSearch: ', employeeSearch);
      console.log('Im error on the get employee \n', err);

      return {
        statusCode: 500
      }
    }

  },
  update: async(event, context) => {
    const body = JSON.parse(event.body);
    const params = event.pathParameters;
    try {
      console.log(body);
      console.log(params);
    } catch (err) {
      console.log('I am a error on the pick body hehe \n', err);
      return {
        statusCode: 400,
        body: { message: "Daaamn!"}
      }
    }
    const hasntName = (typeof body.name === undefined);

    if (hasntName) {
      console.log("Missing parameters");
      return {
        statusCode: 400,
        body: { message: "Daaamn!"}
      }
    }
    const employeeSearch = {
      TableName: process.env.DYNAMODB_EMPLOYEE_TABLE,
      Key: {
        email: params.email // or event.pathParameters.email
      },
      UpdateExpression: 'SET #name = :name',
      ExpressionAttributeNames: {
        '#name': 'name'
      },
      ExpressionAttributeValues: { 
        ':name': body.name
      },
      ReturnValues: 'ALL_NEW'
    }

    
    try {
      const dynamodb = new AWS.DynamoDB.DocumentClient();
      const employeeUpdated = await dynamodb.update(employeeSearch).promise();

      const isNullEmployee = (employeeUpdated.Attributes === null);

      if (isNullEmployee) return { statusCode: 404 }
      

      return {
        statusCode: 200,
        body: JSON.stringify(employeeUpdated.Attributes)
      }

    } catch (err) {
      console.log('employeeSearch: ', employeeSearch);
      console.log('Im error on the update employee \n', err);

      return {
        statusCode: 500
      }
    }
  },
  delete: async(event, context) => {
    const params = event.pathParameters;
    const employeeSearch = {
      TableName: process.env.DYNAMODB_EMPLOYEE_TABLE,
      Key: {
        email: params.email // or event.pathParameters.email
      },
      ReturnValues: 'ALL_OLD'
    }

    try {
      const dynamodb = new AWS.DynamoDB.DocumentClient();
      const employeeDeleted = await dynamodb.delete(employeeSearch).promise();      

      return {
        statusCode: 200,
        body: JSON.stringify(employeeDeleted.Attributes)
      }

    } catch (err) {
      console.log('employeeSearch: ', employeeSearch);
      console.log('Im error on the delete employee \n', err);

      return {
        statusCode: 500
      }
    }

  }
}