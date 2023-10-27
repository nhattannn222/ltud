const { Bill } = require("../models");


class BillService{
    async CreateBill(billData) {
        try {
          const bill = await Bill.create(billData);
          return bill;
        } catch (error) {
          throw error;
        }
      }
    
}
const billService=new BillService();
module.exports=billService;