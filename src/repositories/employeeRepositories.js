'use strict';

const employeeModel = require('../models/employeeModel');

module.exports = {
  async create(item) {
    console.log('item on repo, create employee', item);


    const employeeCreated = await employeeModel.put(item);
    return employeeCreated;
  },

  async listAll() {
    const employees = await employeeModel.scan();
    return employees.Items;
  },

  async getByEmail(email) {
    console.log('on repo get email', email);
    const employee = await employeeModel.get(email);
    return employee.Item;
  },

  async update(data) {
    console.log('on repo get update', data);
    const employee = await employeeModel.update(data);
    return employee.Item;
  },

  async delete(email) {
    console.log('on repo delete employee', email);
    const employee = await employeeModel.delete(email);
    return employee.Item;
  }
}