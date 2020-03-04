const Student = require('../models/Student')
const Utils = require('../Utils')
module.exports.GetStudents = async (req, res) => {
    try {
        // using DB
        const students = await Student.GetAllStudents();
        return Utils.returnSuccess(res, students, 200)
        return res.end()
    } catch (error) {
        return Utils.returnError(res, '[ERROR] Something went wrong with DB.', 500)
    }
}