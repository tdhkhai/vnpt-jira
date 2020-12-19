const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Domain = new Schema({
    id: {
        type: String
    },
    loaiDomain: {
        type: String
    },
    am: {
        _id: String,
        userCode: String,
        unitCode: String,
        userName: String,
    },
    comTaxCode:{
        type: String
    },
    comName:{
        type: String
    },
    registrationDate:{
        type: Date
    },
    extendDate:{
        type: Object
    },
    cancelDate:{
        type: Date
    },
    remark:{
        type: String
    },
}, {
    collection: 'Domain'
})

module.exports = mongoose.model('Domain', Domain)