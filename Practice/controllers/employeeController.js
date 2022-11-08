// import { default as datas } from "../model/employee.json" assert { type: "json" };
// let data = {
//   employees: datas,
//   setEmployee: function (data) {
//     this.employees = data;
//   },
// };
import mongooseEmployeeSchema from "../model/Employee.js";
export const getAllData = async (req, res) => {
  const employees = await mongooseEmployeeSchema.find();
  try {
    if (!employees)
      return res.status(204).json({ message: "No employees found." });
    return res.json(employees);
  } catch (e) {
    return res
      .status(400)
      .json({ message: "firstname or lastname is required" });
  }
};

export const createNewEmployee = async (req, res) => {
  // const newemployee = {
  //   id: data.employees[data.employees.length - 1].id + 1 || 1,
  //   firstname: req.body.firstname,
  //   lastname: req.body.lastname,
  // };

  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: "firstname or lastname is required" });
  }

  try {
    const result = await mongooseEmployeeSchema.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "error" });
  }
};

export const updateEmployee = async (req, res) => {
  // const employee = data.employees.find(
  //   (emp) => emp.id === parseInt(req.body.id)
  // ); //get single employee by id
  if (!req?.body?.id) {
    return res.status(400).json({ message: "id parameter is required" });
  }
  const employee = await mongooseEmployeeSchema
    .findOne({ _id: req.body.id })
    .exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ID ${req.body.id} is not match` });
  } //亂key id
  if (req.body?.firstname) employee.firstname = req.body.firstname;
  if (req.body?.lastname) employee.lastname = req.body.lastname;
  // const filteredArray = data.employees.filter(
  //   (emp) => emp.id !== parseInt(req.body.id)
  // ); //filter 掉單一一筆後
  // const unsortedArray = [...filteredArray, employee];
  // data.setEmployee(
  //   unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  // );
  const result = await employee.save();
  res.json(result);
};

export const deleEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "id parameter is required" });
  }
  const employee = await mongooseEmployeeSchema
    .findOne({ _id: req.body.id })
    .exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `Employee ID ${req.body.id} is not match` });
  } //亂key id
  // const filteredArray = data.employees.filter(
  //   (emp) => emp.id !== parseInt(req.body.id)
  // );
  // data.setEmployee([...filteredArray]);
  // res.json(data.employees);
  const result = await employee.deleteOne({ _id: req.body.id });
  return res.json(result);
};

export const getEmployeeByid = async (req, res) => {
  if (!req?.params?.id) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.params.id} is required` });
  }
  try {
    const employee = await mongooseEmployeeSchema
      .findOne({ _id: req.params.id })
      .exec();
    if (!employee) {
      return res
        .status(400)
        .json({ message: `Employee ID ${req.params.id} not found` });
    } //亂key id
    res.json(employee);
  } catch (e) {
    let a = e;
  }
};

// export default {
//   getAllData,
//   createNewEmployee,
//   updateEmployee,
//   deleEmployee,
//   getEmployeeByid,
// };
