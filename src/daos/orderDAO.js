import pool from '../../config/db.js';
import Order from '../models/order.js';

export default class orderDAO {
    static async getAllOrders() {
        try {
            const results = await pool.query('SELECT * FROM orders');
            const orders = results.rows.map(row => 
                new Order(row.id, row.total_price, row.employee_id, row.order_date)
            );
            return orders;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw new Error('Error fetching orders from database');
        }
    }
    
    static async getOrderById(_id) {
        const result = await pool.query('SELECT * FROM orders WHERE id = $1', [_id]);
        if(result.rows.length === 0) {
            return null;
        }
        const {id, total_price, employee_id, order_date} = result.rows[0];
        return new Order(id, total_price, employee_id, order_date);
    }
    static async addOrder(order) {
        try {
            await pool.query('BEGIN');
            const result = await pool.query('INSERT INTO orders (total_price, employee_id, order_date) \
                                             VALUES ($1, $2, $3) RETURNING id',
                                            [order.total_price, order.employee_id, order.order_date]);
            const orderId = result.rows[0].id;
            await pool.query('COMMIT');
            order.id = orderId;
            return order;
        } catch(error) {
            await pool.query('ROLLBACK');
            console.log("error adding order " + error);
        }
    }
    static async updateOrder(order) {
        try {
            await pool.query('BEGIN');
            const result = await pool.query('UPDATE orders SET total_price = $2, employee_id = $3, order_date=$4, image = $5\
                                             WHERE id = $1\
                                             RETURNING *',
                                            [order.id, order.total_price, order.employee_id, order.order_date]);
            const np = result.rows[0];
            order.id = np.id;
            order.total_price = np.total_price;
            order.employee_id = np.employee_id;
            order.order_date = np.order_date;
            await pool.query('COMMIT');
            return order;
        } catch(error) {
            await pool.query('ROLLBACK');
            console.log("error updating order " + error);
        }

    }
    static async deleteOrder(id) {
        try {
            await pool.query('BEGIN');
            const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *',
                                            [id]);
            await pool.query('COMMIT');
            if(result.rowCount === 0) {
                return false;
            }
            return true;
            //return order;
        } catch(error) {
            await pool.query('ROLLBACK');
            console.log("error updating order " + error);
        }
    }
    
}