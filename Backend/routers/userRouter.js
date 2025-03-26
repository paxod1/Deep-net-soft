const router = require('express').Router()
const menu = require('../models/menuSchema')
const item = require('../models/itemSchema')

// adding new menu router
router.post('/addmenu', async (req, res) => {
    try {
        const newMenu = new menu(req.body)
        await newMenu.save()
        console.log('new menu added!');
        res.status(201).json('new menu is added sucessfully')

    } catch (err) {
        console.log("Err from add menu router");
        res.status(500).json(err)
    }
})

// get all menus list

router.get('/getallmenu', async (req, res) => {
    try {
        const allMenu = await menu.find()
        res.status(200).json(allMenu)

    } catch (err) {
        console.log("Error from get all menu");
        res.status(500).json(err)
    }
})

// adding new item to data base 
router.post('/additem', async (req, res) => {
    try {
        const newItem = new item(req.body)
        await newItem.save()
        console.log('new item added!');
        res.status(201).json('new item is added sucessfully')

    } catch (err) {
        console.log("Err from add item router", err);
        res.status(500).json(err)
    }
})

// get item with menu id 
router.get('/get-item-menu/:id', async (req, res) => {
    var menuID = req.params.id
    try {
        const allItem = await item.find({ menuId: menuID })
        res.status(200).json(allItem)

    } catch (err) {
        console.log("Error from get all menu");
        res.status(500).json(err)
    }
})


module.exports = router