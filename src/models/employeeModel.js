'use strict';
const AWS = require('aws-sdk');
const { Table, Entity } = require('dynamodb-toolbox');


const docClient = new AWS.DynamoDB.DocumentClient();

const employeeTable = new Table({
  name: process.env.DYNAMODB_EMPLOYEE_TABLE,
  partitionKey: 'pk',
  sortKey: 'sk',
  DocumentClient: docClient
});

const employeeModel = new Entity({
  name: 'Employee',
  attributes: {
    email: { partitionKey: true, type: 'String', required: true },
    sk: { sortKey: true },
    name: { type: 'String', required: true },
    company: { type: 'String', required: true },
    avatar: { type: 'String',  required: false },

  },
  table: employeeTable,
});

module.exports = employeeModel;