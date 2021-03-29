const User = require('../models/user')
const EmployeeService = require('../models/employeeService')

class Front {

    async getEmployeesByService(req, res){
        try {
            const services = await EmployeeService.find({service: req.body.service}).populate('employee')
            return res.status(200).json(services)

        } catch (e) {
            return res.status(505).json({message: 'Server Error Front@getEmployeesByService'})
        }
    }

    async getEmployee(req, res) {
        try {
            const employee = await User.find({type: 'employee'})
            return res.status(200).json(employee)
        } catch (e) {
            return res.status(505).json({message: 'Server Error Front@getEmployee'})
        }
    }
}

module.exports = function() {
    return new Front()
}
