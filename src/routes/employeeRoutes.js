const routes = require('express').Router({ mergeParams: true });

routes.get('/', (req, res, next) => {

  res.status(200).json({ message: "You're rock!"})
});

routes.post('/', (req, res, next) => {
  const body = req.body;


  const employeeData = {
    name: body.name,
    email: body.email,
    company: body.company
  }


  res.status(201).json(employeeData);
});


module.exports = routes;