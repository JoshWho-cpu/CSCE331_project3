import pool from '../../config/db.js';
import Inventory from '../models/inventory.js';

export default class inventoryDAO {
    static async getAllInventory() {
        try {
            const results = await pool.query('SELECT *  FROM inventory');
            const inventory = results.rows.map(row => new Inventory(row.id, row.name, row.unit));
            return inventory;
        } catch(error) {
            console.error('Error fetching inventory:', error);
            throw new Error('Error fetching inventory from database');
        }
    }
    static async getInventoryById(_id) {
        try {
            const result = await pool.query('SELECT *  FROM inventory WHERE id = $1', [_id]);
            if(result.rows.length == 0) return null;
            const {id, name, units} = result.rows[0];
            return new Inventory(id, name, units);
        } catch(error) {
            console.error('Error fetching inventory by id:', error);
            throw new Error('Error fetching inventory from database');
        }
    }
    static async getInventoryByName(_name) {
        try {
            const result = await pool.query('SELECT *  FROM inventory WHERE name = $1', [_name]);
            if(result.rows.length == 0) return null;
            const {id, name, units} = result.rows[0];
            return new Inventory(id, name, units);
        } catch(error) {
            console.error('Error fetching inventory by name:', error);
            throw new Error('Error fetching inventory from database');
        }
    }
    static async addInventory(inventory) {
        try {
            await pool.query('BEGIN');
            const result = await pool.query('INSERT INTO inventory (name, units) \
                                             VALUES ($1, $2) RETURNING id',
                                            [inventory.name, inventory.units]);
            const id = result.rows[0].id;
            inventory.id = id;
            await pool.query('COMMIT');
            return inventory;
        } catch(error) {
            await pool.query('ROLLBACK');
            console.log("error adding inventory " + error);
        }
    }
    static async updateInventory(inventory) {
        try {
            await pool.query('BEGIN');
            const result = await pool.query('UPDATE inventory SET name = $2, units = $3\
                                             WHERE id = $1\
                                             RETURNING *',
                                            [inventory.id, inventory.name, inventory.units]);
            const np = result.rows[0];
            inventory.id = np.id;
            inventory.name = np.name;
            inventory.units = np.units;
            await pool.query('COMMIT');
            return inventory;
        } catch(error) {
            await pool.query('ROLLBACK');
            console.log("error updating inventory " + error);
        }

    }
    static async deleteInventory(id) {
        try {
            await pool.query('BEGIN');
            const result = await pool.query('DELETE FROM inventory WHERE id = $1 RETURNING *',
                                            [id]);
            await pool.query('COMMIT');
            if(result.rowCount === 0) {
                return false;
            }
            return true;
            //return inventory;
        } catch(error) {
            await pool.query('ROLLBACK');
            console.log("error deleting inventory " + error);
        }
    }
    
}
