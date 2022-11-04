import { default as datas } from "../model/employee.json" assert { type: "json" };
let data = {
  employees: datas,
  setEmployee: function (data) {
    this.employees = data;
  },
};

export const getAllData = (req, res) => {
  res.json(data.employees);
};

export const createNewEmployee = (req, res) => {
  const newemployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  if (!newemployee.firstname || !newemployee.lastname) {
    res.status(400).json({ message: "First and Last name is must required" });
  }
  data.setEmployee([...data.employees, newemployee]);
  res.status(201).json(data.employees);
};

export const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  ); //get single employee by id
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  } //亂key id
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  ); //filter 掉單一一筆後
  const unsortedArray = [...filteredArray, employee];
  data.setEmployee(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.employees);
};

export const deleEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    //亂key id
    return res
      .status(400)
      .json({ message: `Employee ID ${req.body.id} not found` });
  }
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployee([...filteredArray]);
  res.json(data.employees);
};

export const getEmployeeByid = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  ); //get single employee by id
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.params.id} not found` });
  } //亂key id
  res.json(employee);
};

// export default {
//   getAllData,
//   createNewEmployee,
//   updateEmployee,
//   deleEmployee,
//   getEmployeeByid,
// };
