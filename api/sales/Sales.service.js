const pool = require("../../Config/database");

module.exports = {
  //geting countries
  add_Customer_orderDetails: (req, callBack) => {
    let sales=req.body;
    let query=`SET @customerId=?; SET @total=?; CALL CustomerOrderDetails(@customerId,@total,@orderid,@Err,@status);select @status as status; select @err as Error;select @orderid as orderid`;
    pool.query(
      query,
      [
        sales.customerid,
        sales.total
      ],(error, results, _fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, results);
      });
    //let query=`CALL AddSales(@CustomerOrderId,@ProductId,@Price,@Quantity,@SubTotal,@status,@Err_msg);select @status as status; select @Err_msg as Err_msg;`;
    //console.log(sales.product);
  },
  addSalesorderProduct: (req,orderid,callBack) => {
    let product = req.body.product;
    var products = [];
    console.log("serv"+orderid)
    for (var i = 0; i < product.length; i++)
    {
      products.push([
        orderid,
        product[i].productid,
        product[i].price,
        product[i].qty,
        product[i].subtotal
      ]);
    }
      

    let sql = `INSERT INTO Sales_Order_Products (CustomerOrderId, ProductId,Price,Quantity,SubTotal) VALUES ?`;

    pool.query(
      sql,
      [products],

      (error, resultss, _fields) => {
        if (error) {
          return callBack(error);
        }

        return callBack(null, resultss);
      }
    );
  }
};