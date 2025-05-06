const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB setup
mongoose.connect('mongodb://127.0.0.1:27017/employeeDB');

// Schema and Model
const employeeSchema = new mongoose.Schema({
    name: String,
    department: String,
    designation: String,
    salary: Number,
    joiningdate: String
});

const Employee = mongoose.model('Employee', employeeSchema);

// Routes
app.post('/create', async (req, res) => {
    try {
        const emp = new Employee(req.body);
        await emp.save();
        res.json(emp);
    } catch (err) {
        res.status(500).json({ error: 'Error adding employee' });
    }
});

app.get('/employees', async (req, res) => {
    try {
        const data = await Employee.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching employees' });
    }
});

app.put('/update/:id', async (req, res) => {
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(emp);
});

app.delete('/delete/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting employee' });
    }
});

app.listen(3001, () => {
    console.log('Server running at http://localhost:3001');
});
