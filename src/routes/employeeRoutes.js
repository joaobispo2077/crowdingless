const routes = require('express').Router({ mergeParams: true });
const Employee = require('../controllers/employeeController');

routes.get('/', Employee.listAll);
routes.get('/:email', Employee.getByEmail);
routes.post('/', Employee.create);

module.exports = routes;