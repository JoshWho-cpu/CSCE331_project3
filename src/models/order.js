export default class Order {
    constructor(id, total_price, employee_id, order_date) {
        this.id = id;
        this.total_price = total_price;
        this.employee_id = employee_id;
        this.order_date = order_date;
    }
}