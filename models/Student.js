const mongoose = require('mongoose');
const config = require('../config');
const conn = mongoose.createConnection(config.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

conn.on('error', error => {
    if (error) throw error;
})

conn.on('open', _ => {
    console.log(`MongoDB connected successfully`);
})

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            // firstname.lastname@mailserver.domain.com
            validator: (value) => /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v)
        },
        message: "{VALUE} is not a valid email!"
    },
    matricolNumber: {
        type: String,
        required: true,
        unique: true
    }
})

const studentModel = conn.model('students', studentSchema);

module.exports.GetAllStudents = () => {
    return new Promise((resolve, reject) => {
        const query = studentModel.find({});

        query.lean().exec((err, res) => {
            if (res)
                resolve(res)
            else
                reject(err)
        })
    })
}