import express from "express";
import { fileURLToPath } from "url";
import * as funs from "../../controllers/employeeController.js";
import ROLES_LIST from "../../Config/roles_list.js";
import verifyRoles from "../../middleware/verifyRoles.js"; //判權限用
const employeeRouter = express.Router();
employeeRouter
  .route("/") //等同於.get('/',(req,res))
  .get(funs.getAllData)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    funs.createNewEmployee
  )
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), funs.updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), funs.deleEmployee);
employeeRouter.route("/:id").get(funs.getEmployeeByid);
export default employeeRouter;
