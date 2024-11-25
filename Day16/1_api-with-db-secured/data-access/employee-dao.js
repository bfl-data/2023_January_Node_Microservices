const Employee = require('../models/employee');

module.exports = class EmployeeDAO {
    static async getAllEmployees() {
        try {
            const allEmployees = await Employee.find();
            return allEmployees;
        } catch (error) {
            console.log(`Could not fetch Employees ${error}`);
        }
    }

    static async getEmployee(recordId) {
        try {
            const singleEmployee = await Employee.findById({_id: recordId});
            return singleEmployee;
        } catch (error) {
            console.log(`Could not fetch Employees ${error}`);
        }
    }

    static async createEmployee(employee) {
        try {
            const response = await new Employee(employee).save();
            return response;
        } catch (error) {
            console.log(`Could not create employee ${error}`);
        }
    }

    static async updateEmployee(recordId, employee) {
        try {
            const updateResponse = await Employee.findOneAndUpdate({ _id: recordId }, employee);
            return updateResponse;
        } catch (error) {
            console.log(`Could not update employee ${error}`);
        }
    }

    static async deleteEmployee(recordId) {
        try {
            const deletedResponse = await Employee.findOneAndDelete({ _id: recordId });
            return deletedResponse;
        } catch (error) {
            console.log(`Could not delete employee ${error}`);
        }
    }
}