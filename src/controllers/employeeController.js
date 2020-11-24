'use strict';
const crypto = require('crypto');

const employeeRepositories = require('../repositories/employeeRepositories');

module.exports = {

  async create(req, res, next) {
    const { name, email, company } = req.body;
    const { 
      originalname: avatar_name = 'abc', 
      location: avatar = 'abc',
      key: avatar_key = 'abc',
     } = await req.file;

    const hasntEmail = (typeof email === undefined || email.lenght == 0);    
    if (hasntEmail) {
      res.status(400).json({message: 'email inválido'});
      return;
    }

    const employee = {
      email,
      name,
      company,
      avatar,
      avatar_name,
      avatar_key,
    };
    console.log(employee);
    try{
      const createdEmployee = await employeeRepositories.create(employee);
      console.log(createdEmployee);
      res.status(201).json(createdEmployee);

    } catch (err) {
      console.log('Error creating employee', err);
      res.status(500).json({error: 'internal server error'});

    }
    
  },

  async getByEmail(req, res, next) {
    const {  email } = req.params;

    const hasntemail = (typeof email === 'undefined' || email.lenght == 0);

    if (hasntemail) {
      res.status(400).json({message: 'email inválido'});
      return;
    }
    const searchParams = {
      email: email,

    }

    try {
      const employee = await employeeRepositories.getByEmail(searchParams);
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
  },

  async update(req, res, next) {
    const { email } = req.params;
    const { name } = req.body;
    const hasntemail = (typeof email === 'undefined' || email.lenght == 0);

    if (hasntemail) {
      res.status(400).json({message: 'email inválido'});
      return;
    }
    const updateParams = {
      name,
      email
    }

    try {

      const employees = await employeeRepositories.update(updateParams);
      res.status(200).json(employees);

    } catch (err) {
      console.log('Error at update employee', err);
      res.status(500).json({error: 'internal server error'});
    }
  },

  async remove(req, res, next) {
    const { email } = req.params;

    const deteleParams = {
      email
    }

    try {
      const employees = await employeeRepositories.delete(deteleParams);
      res.status(200).json(employees);
    } catch (err) {
      console.log('Error at remove employee', err);
      res.status(500).json({error: 'internal server error'});
    }
  }

}