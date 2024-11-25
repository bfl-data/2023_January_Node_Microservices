const express = require('express');
var cors = require('cors');

const router = express.Router();

const employeesApiCtrl = require('../controllers/employees-api-controller');
const { validateToken } = require('../controllers/account-controller');

router.use(cors());

router.use(validateToken);

// GET - /api/employees (Get All Employees)
router.get("/", employeesApiCtrl.getAll);

// GET - /api/employees/kajsdhjkash28 (Get Employee by Id)
router.get("/:rid", employeesApiCtrl.get);

// POST - /api/employees (Create an Employee)
router.post("/", employeesApiCtrl.create);

// PUT - /api/employees/kajsdhjkash28 (Update Employee by Id)
router.put("/:rid", employeesApiCtrl.edit);

// DELETE - /api/employees/kajsdhjkash28 (DELETE Employee by Id)
router.delete("/:rid", employeesApiCtrl.delete);

module.exports = router;