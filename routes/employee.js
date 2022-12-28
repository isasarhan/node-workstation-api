const { Employee, validateEmployee } = require('../models/Employee')
const express = require('express')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const router = express.Router()


router.get('/', async (req, res) => {
    const employees = await Employee.find()
    res.send(employees)
})

router.get('/:id', async (req, res) => {
    const employee = await Employee.findById(req.params.id)
    if (!employee) return res.status(404).send("Employee Not Found!")
    res.json(employee).status(200)
})

router.post('/', async (req, res) => {
    let employee = new Employee(
        {
            name: req.body.name,
            mobile: req.body.mobile,
            salary: req.body.salary
        }
    )
    const { error } = validateEmployee(req.body)
   
    if (error) return res.status(400).send(error.details[0].message)

    const searched = await Employee.findOne({ name: employee.name })

    if (searched) return res.status(400).send("Employee already exits")

    employee = await employee.save()
    res.send(employee)
})
router.put('/:id',  async (req, res) => {

    const { error } = validateEmployee(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    console.log(req.body)
    
    const employee = await Employee.findByIdAndUpdate(req.params.id,
        {
            $set: req.body,
        },
        { new: true }
    )
    if (!employee) return res.status(404).send("Employee Not Found!!")

    res.send(employee).status(200).end()
})
router.delete('/:id', [auth, admin], async (req, res) => {
    const employee = await Employee.findById(req.params.id)
    if (!employee) return res.status(404).send("Employee Not Found!!")
    const deleted = await Employee.deleteOne(employee)
    res.status(200).send(deleted)
})

module.exports = router