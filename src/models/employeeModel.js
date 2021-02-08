'use strict';
const AWS = require('aws-sdk');
const { Table, Entity } = require('dynamodb-toolbox');


const docClient = new AWS.DynamoDB.DocumentClient();

const employeeTable = new Table({
  name: process.env.DYNAMODB_EMPLOYEE_TABLE,
  partitionKey: 'email',
  DocumentClient: docClient
});

const employeeModel = new Entity({
  name: 'Employee',
  attributes: {
    email: { partitionKey: true },
    name: { type: 'string', required: true },
    emailable: { type: 'boolean', required: true },
    company: { type: 'string', required: true },
    avatar: { type: 'string',  required: false },
    avatar_name: { type: 'string',  required: false },
    avatar_key: { type: 'string',  required: false },


  },
  table: employeeTable,
});

module.exports = employeeModel;