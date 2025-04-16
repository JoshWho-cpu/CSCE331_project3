import pool from '../../config/db.js';

export default class orderDetailDAO {
    static async addOrderDetail(_order_id, _product_id) {
        try {
            pool.query('BEGIN');
            const result = await pool.query('INSERT INTO order_details (order_id, product_id) VALUES ($1, $2)', [_order_id, _product_id]);
            pool.query('COMMIT');
        } catch(error) {
            await pool.query('ROLLBACK');
        }
    }
    
}