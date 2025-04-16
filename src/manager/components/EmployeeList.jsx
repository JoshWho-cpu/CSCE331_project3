import React, { useEffect, useState } from 'react';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeRole, setNewEmployeeRole] = useState('');
  const [newEmployeePassword, setNewEmployeePassword] = useState('');

  useEffect(() => {
    fetch('https://csce331-project3-backend.onrender.com/employees')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch employees');
        return res.json();
      })
      .then(data => setEmployees(data))
      .catch(err => setError(err.message));
  }, []);

  const handleChange = (id, field, value) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(emp =>
        emp.id === id ? { ...emp, [field]: value } : emp
      )
    );
  };

  const handleSave = async (id, updatedData) => {
    const updatedEmployee = employees.find(emp => emp.id === id);
    console.log('Saving employee:', updatedEmployee);
    // Replace with PUT request when you're ready
    try {
      const response = await fetch(`https://csce331-project3-backend.onrender.com/employee/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });      

      if (!response.ok) {
          throw new Error('Employee update failed');
      }
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleAddEmployee = async () => {
    const newEmployee = {
      name: newEmployeeName,
      role: newEmployeeRole,
      password: newEmployeePassword,
    };
  
    try {
      const response = await fetch('https://csce331-project3-backend.onrender.com/employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmployee),
      });
  
      if (!response.ok) throw new Error('Failed to add employee');
  
      const addedEmployee = await response.json();
  
      // Add the new employee to the list
      setEmployees(prev => [...prev, addedEmployee]);
  
      // Clear the form
      setNewEmployeeName('');
      setNewEmployeeRole('');
      setNewEmployeePassword('');
    } catch (err) {
      console.error('Error adding employee:', err.message);
    }
  };
  

  if (error) return <div>Error: {error}</div>;
  if (employees.length === 0) return <div>Loading...</div>;

  return (
    <div>
      <h3>Add New Employee</h3>
      <div style={{ border: '1px solid green', padding: '10px', marginTop: '20px' }}>
        <label>
          Name:
          <input
            type="text"
            value={newEmployeeName}
            onChange={(e) => setNewEmployeeName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Role:
          <input
            type="text"
            value={newEmployeeRole}
            onChange={(e) => setNewEmployeeRole(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={newEmployeePassword}
            onChange={(e) => setNewEmployeePassword(e.target.value)}
          />
        </label>
        <br />
        <button
          onClick={handleAddEmployee}
          disabled={!newEmployeeName || !newEmployeeRole || !newEmployeePassword}
        >
          Add Employee
        </button>
      </div>

      <h2>Edit Employees</h2>
      {employees.map(emp => (
        <div key={emp.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <div><strong>ID:</strong> {emp.id}</div>
          <label>
            Name:
            <input
              type="text"
              value={emp.name}
              onChange={(e) => handleChange(emp.id, 'name', e.target.value)}
            />
          </label>
          <br />
          <label>
            Role:
            <input
              type="text"
              value={emp.role}
              onChange={(e) => handleChange(emp.id, 'role', e.target.value)}
            />
          </label>
          <br />
          {/* Hide password */}
          <div><i>Password hidden for security</i></div>
          <br />
          <button onClick={() => handleSave(emp.id, { name: emp.name, role: emp.role})}>Save</button>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;

