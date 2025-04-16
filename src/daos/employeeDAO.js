import pool from '../../config/db.js';
import Employee from '../models/employee.js';

export default class employeeDAO {
    static async getEmployeeById(_id) {
        const result = await pool.query('SELECT * FROM employees WHERE id = $1', [_id]);
        if(result.rows.length === 0) {
            return null;
        }
        const {id, name, role, password} = result.rows[0];
        //console.log({id, name, role, password});
        return new Employee(id, name, role, password);

    }
    static async getEmployeeByName(_name) {
        const result = await pool.query('SELECT * FROM employees WHERE name = $1', [_name]);
        if(result.rows.length === 0) {
            return null;
        }
        const {id, name, role, password} = result.rows[0];
        console.log({id, name, role, password});
        return new Employee(id, name, role, password);
    }
    static async getEmployeeByNamePassword(_name, _password) {
        const result = await pool.query('SELECT * FROM employees WHERE name = $1 AND password = $2', [_name, _password]);
        if(result.rows.length === 0) {
            return null;
        }
        const {id, name, role, password} = result.rows[0];
        //console.log({id, name, role, password});
        return new Employee(id, name, role, password);
    }
    static async getAllEmployees() {
        const result = await pool.query('SELECT * FROM employees');
        return result.rows;
    }
    static async addEmployee(employee) {
        try {
            await pool.query('BEGIN');
            const result = await pool.query('INSERT INTO employees (name, role, password) \
                                             VALUES ($1, $2, $3) RETURNING id',
                                            [employee.name, employee.role, employee.password]);
            const id = result.rows[0].id;
            employee.id = id;
            await pool.query('COMMIT');
            return employee;
        } catch(error) {
            await pool.query('ROLLBACK');
            console.log("error adding employee " + error);
        }
    }
    static async updateEmployee(employee) {
        try {
            await pool.query('BEGIN');
            const result = await pool.query('UPDATE employees SET name = $2, role = $3, password = $4\
                                             WHERE id = $1\
                                             RETURNING *',
                                            [employee.id, employee.name, employee.role, employee.password]);
            const np = result.rows[0];
            employee.id = np.id;
            employee.name = np.name;
            employee.role = np.role;
            employee.password = np.password;
            await pool.query('COMMIT');
            return employee;
        } catch(error) {
            await pool.query('ROLLBACK');
            console.log("error updating employee " + error);
        }
    }
    static async deleteEmployee(id) {
        try {
            await pool.query('BEGIN');
            const result = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING *',
                                            [id]);
            await pool.query('COMMIT');
            if(result.rowCount === 0) {
                return false;
            }
            return true;
        } catch(error) {
            await pool.query('ROLLBACK');
            console.log("error deleting employee " + error);
        }
    }

}