module.exports = cds.service.impl(async function () {
    
    const {POs, EmployeeSet, AddressSet} = this.entities;

    this.before('UPDATE', EmployeeSet, (req, res) => {
        console.log("aa gaya update se pahle ", JSON.stringify(req.data));
        if(parseFloat(req.data.salaryAmount) >= 1000000){
            req.error(500, "Salary must be less than 1 mn");
        }
        
    });

    this.on('READ',AddressSet, (req,res) => {
        return {
            "NODE_KEY": "ZKAS",
            "CITY": "Gurgaon",
            "STREET": "Golf Course Ext Road",
            "BUILDING": "M3M 65th Avenue"
        }
    });

    this.on('boost', async (req, res) => {
        try {
            const ID = req.params[0];
            console.log("Hey bro, here is your ID ",JSON.stringify(ID));
            const tx = cds.tx(req);
            await tx.update(POs).with({
                GROSS_AMOUNT : {'+=': 20000}
            }).where(ID);

            return await tx.read(POs).where(ID);
            
        } catch (error) {
            return "Error " + error.toString();
        }
    });

    this.on('getLargestOrder', async (req, res) => {
        try {
            const tx = cds.tx(req);
            return await tx.read(POs).orderBy({
                GROSS_AMOUNT: 'desc'
            }).limit(1);
            
        } catch (error) {
            return "Error " + error.toString();
        }
    });

    this.on('getOrderDefault', async (req, res) => {
        try {
            return {
                "CURRENCY_code": "EUR",
                "OVERALL_STATUS": 'N'
            }
        } catch (error) {
            return "Error " + error.toString();
        }
    })

    this.on('setOrderStatus', async (req, res) => {
        try {
            const ID = req.params[0];
            console.log("Hey bro, here is your ID ",JSON.stringify(ID));
            const tx = cds.tx(req);
            await tx.update(POs).with({
                OVERALL_STATUS: 'D'
            }).where(ID);

            return await tx.read(POs).where(ID);
            
        } catch (error) {
            return "Error " + error.toString();
        }
    })

});