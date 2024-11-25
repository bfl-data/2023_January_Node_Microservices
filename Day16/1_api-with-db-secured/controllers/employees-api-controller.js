const DAO = require("../data-access/employee-dao");

exports.getAll = (req, res) => {
    DAO.getAllEmployees().then(result => {
        res.status(200).json({data: result, message: "Success, getting Employees" });
    }).catch(eMsg => {
        res.status(500).json({data: [], message: "Error, getting Employees" });
    });
}

exports.get = (req, res) => {
    var _id = req.params.rid;
    DAO.getEmployee(_id).then(result => {
        res.status(200).json({data: result, message: "Success, getting Employee" });
    }, eMsg => {
        res.status(500).json({data: [], message: "Error, getting Employee" });
    });
}

exports.create = async (req, res) => {
    var { eid, ename } = req.body;
    var employee = { id: parseInt(eid), name: ename };

    try {
        var result = await DAO.createEmployee(employee)
        res.status(201).json({data: result, message: "Success, Creating Employee" });
    } catch (eMsg) {
        res.status(500).json({data: null, message: "Error, Creating Employee" });
    }
}

exports.edit = (req, res) => {
    var _id = req.params.rid;
    var { eid, ename } = req.body;
    var employee = { id: parseInt(eid), name: ename };

    DAO.updateEmployee(_id, employee).then(result => {
        res.status(200).json({data: result, message: "Success, Updating Employee" });
    }, eMsg => {
        res.status(500).json({data: null, message: "Error, Updating Employee" });
    });
}

exports.delete = (req, res) => {
    var _id = req.params.rid;

    DAO.deleteEmployee(_id).then(_ => {
        res.status(204).json({data: null, message: "Success, Deleting Employee" });
    }, eMsg => {
        res.status(500).json({data: null, message: "Error, Deleting Employee" });
    });
}