const mongoose = require('mongoose')

const menuSechema = new mongoose.Schema({
    menuName: { type: String, required: true },
    heading: { type: String, required: true }
})

module.exports = mongoose.model('menu', menuSechema)