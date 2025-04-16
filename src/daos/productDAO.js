import pool from '../../config/db.js';
import Product from '../models/product.js';

export default class productDAO {
    static async getAllProducts() {
        try {
            const results = await pool.query('SELECT *  FROM products');
            const products = results.rows.map(row => new Product(row.id, row.name, row.price, row.category, row.image));
            return products;
        } catch(error) {
            console.error('Error fetching products:', error);
            throw new Error('Error fetching products from database');
        }
    }
    static async getProductById(_id) {
        try {
            const result = await pool.query('SELECT *  FROM products WHERE id = $1', [_id]);
            if(result.rows.length == 0) return null;
            const {id, name, price, category, image} = result.rows[0];
            return new Product(id, name, price, category, image);
        } catch(error) {
            console.error('Error fetching products by id:', error);
            throw new Error('Error fetching products from database');
        }
    }
    static async getProductByName(_name) {
        try {
            const result = await pool.query('SELECT *  FROM products WHERE name = $1', [_name]);
            if(result.rows.length == 0) return null;
            const {id, name, price, category, image} = result.rows[0];
            return new Product(id, name, price, category, image);
        } catch(error) {
            console.error('Error fetching products by name:', error);
            throw new Error('Error fetching products from database');
        }
    }
    static async addProduct(product) {
        try {
            await pool.query('BEGIN');
            const result = await pool.query('INSERT INTO products (name, price, category, image) \
                                             VALUES ($1, $2, $3, $4) RETURNING id',
                                            [product.name, product.price, product.category, product.image]);
            const id = result.rows[0].id;
            product.id = id;
            await pool.query('COMMIT');
            return product;
        } catch(error) {
            await pool.query('ROLLBACK');
            console.log("error adding product " + error);
        }
    }
    static async updateProduct(product) {
        try {
            await pool.query('BEGIN');
            const result = await pool.query('UPDATE products SET name = $2, price = $3, category=$4, image = $5\
                                             WHERE id = $1\
                                             RETURNING *',
                                            [product.id, product.name, product.price, product.category, product.image]);
            const np = result.rows[0];
            product.id = np.id;
            product.name = np.name;
            product.price = np.price;
            product.category = np.category;
            product.image = np.image;
            await pool.query('COMMIT');
            return product;
        } catch(error) {
            await pool.query('ROLLBACK');
            console.log("error updating product " + error);
        }

    }
    static async deleteProduct(id) {
        try {
            await pool.query('BEGIN');
            const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *',
                                            [id]);
            await pool.query('COMMIT');
            if(result.rowCount === 0) {
                return false;
            }
            return true;
            //return product;
        } catch(error) {
            await pool.query('ROLLBACK');
            console.log("error updating product " + error);
        }
    }
    
}
