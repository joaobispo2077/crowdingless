const routes = require('express').Router({ mergeParams: true });
const Employee = require('../controllers/employeeController');

const multer = require('multer');
const multerConfig = require('../config/multer');

routes.get('/version', (req, res) => {
  return res.json({version: "1.0.0"})
});

routes.get('/', Employee.listAll);
routes.get('/:email', Employee.getByEmail);
routes.post('/', multer(multerConfig).single('file'), Employee.create);
routes.patch('/:email', Employee.update);
routes.delete('/:email', Employee.remove);

module.exports = routes;