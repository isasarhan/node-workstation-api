const express = require('express')
const router = express.Router()
const { Attendence, validateAttendence } = require('../models/Attendencelogs')
const {Employee} = require('../models/Employee')

router.get('/', async (req, res) => {
    const attendence = await Attendence.find()
    res.json(attendence).status(200).end()
})

router.get('/:id', async (req, res) => {
    const attendence = await Attendence.findById(req.params.id)
    if (!attendence) return res.status(404).end()
    res.json(attendence).status(200).end()
})

router.post('/', async (req, res) => {
    const { error } = validateAttendence(req.body)
    if (error) return res.status(400).send(error.details[0].message).end()
    let attendence = new Attendence({
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        employee: {
            name: req.body.name,
            employeeId: req.body.employeeId
        }
    })
    attendence = await attendence.save()

    res.json(attendence).status(201).end()
})

router.put('/:id', async (req, res) => {
    const { error } = validateAttendence(req.body)
    if (error) return res.status(400).send(error.details[0].message).end()
    
    const employee = await Employee.findById(req.body.employeeId)
    if(!employee) return res.status(404).send("Employee doesnot exist").end()

    const attendence = await Attendence.findByIdAndUpdate(req.params.id,
        {
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            employee: {
                name: req.body.name,
                employeeId: req.body.employeeId,
            }
        },{new: true}
    )
    if(!attendence) return res.status(404).send("Attendence doesnot exist").end()

    res.json(attendence).status(201).end()

})
module.exports = router
