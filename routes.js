const StudentsController = require('./controllers')


const routes = [
    {
        method: 'GET',
        path: '/api/v1/students',
        callback: StudentsController.GetStudents
    },
    {
        method: 'GET',
        path: '/',
        callback: StudentsController.GetStudents
    }
]

module.exports = routes;