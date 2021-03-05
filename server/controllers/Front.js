const User = require('../models/user')
const EmployeeService = require('../models/employeeService')

class Front {
    async getEmployeesByService(req, res)
    {
        try {
            console.log(req.body.service);
            const services = await EmployeeService.find({service: req.body.service}).populate('employee')
            return res.status(200).json(services)

        } catch (e) {
            return res.status(505).json({message: 'Server Error Front@getEmployeesByService'})
        }
    }
}

module.exports = function() {
    return new Front()
}
