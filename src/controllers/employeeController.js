'use strict';

const { getById } = require('../repositories/employeeRepositories');
const employeeRepositories = require('../repositories/employeeRepositories');

module.exports = {

  async create(req, res, next) {
    const { name, email, company } = req.body;

    const hasntEmail = (typeof email === 'undefined' || email.lenght == 0);    
    if (hasntEmail) {
      res.status(400).json({message: 'email inválido'});
      return;
    }

    const employee = {
      name,
      email,
      company
    };

    try{
      const createdEmployee = await employeeRepositories.create(employee);
      console.log(createdEmployee);
      res.status(201).json(createdEmployee);

    } catch (err) {
      console.log('Error creating employee', err);
      res.status(500).json({error: 'internal server error'});

    }
    
  },

  async getById(req, res, next) {
    const { id } = req.params;

    const hasntId = (typeof id === 'undefined' || id.lenght == 0);

    if (hasntId) {
      res.status(400).json({message: 'id inválido'});
      return;
    }

    try {
      const employee = await employeeRepositories.getById(id);
      res.status(200).json(employee);
    } catch (err) {
      console.log('Error at get an employee', err);
      res.status(500).json({error: 'internal server error'});
    }

  },

  async listAll(req, res, next) {
    try {
      const employees = await employeeRepositories.listAll();
      res.status(200).json(employees);
    } catch (err) {
      console.log('Error at list all employees', err);
      res.status(500).json({error: 'internal server error'});
    }
  }

}