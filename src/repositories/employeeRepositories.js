'use strict';

const employeeModel = require('../models/employeeModel');

module.exports = {
  async create(data) {
    const employeeCreated = await employeeModel.put(data);
    return employeeCreated;
  },

  async listAll() {
    const employees = await employeeModel.scan();
    return employees;
  },

  async getByEmail(email) {
    const employee = await employeeModel.get(email).promise();
    return employee;
  }
}