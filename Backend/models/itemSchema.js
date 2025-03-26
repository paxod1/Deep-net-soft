const mongoose = require('mongoose')

const itemSechema = new mongoose.Schema({
    itemName: { type: String, required: true },
    itemDes: { type: String, required: true },
    itemPrice: { type: String, required: true },
    menuId: { type: String, required: true }
})

module.exports = mongoose.model('item', itemSechema)