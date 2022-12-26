let { Payment } = require('../models');
const { Op } = require("sequelize");
 
/**
 * Generating value of businesspartner.value with getting the last count of combine name and org.
 * @param {*} name 
 * @param {*} org_id 
 * @returns 
 */
async function GenerateValueGenerator(name, org_id){
    let value = GetAcronymn(name)
    let countBpList = await Businesspartner.findAll({
        where: {
            value: {
                [Op.like]: value + '%'
            },
            org_id: org_id
        }
    })
    if(countBpList.length > 0 ){
        let lastNumber = countBpList.length+1
        value = value + '-' + lastNumber
    }
    return value.toUpperCase();
}

async function GenerateSquencePaymentNo(){
    let squence = sequelize.Sequelize.literal("nextval('paymentNoSquence')")
    return ('PAY-', squence);
}

module.exports = {
    Get: async(req,res) => {
        let data = await Payment.findAll()
        res.status(200).json({
            status: 'succsess',
            msg: 'get succsess',
            data
        })
    },
    GetById: async (req,res) => {
        if(req.body.payment_id === null){
            res.status(500).json({
                status: 'erorr',
                msg: 'Payment_id variabel is null'
            })
        }
        let data = await Payment.findByPk(req.body.payment_id)
        res.status(200).json({
            status: 'succsess',
            msg: 'get succsess',
            data
        })
    },
    Generate: async(req,res) => {
        let bodyV = req.body
        let paymentNo = bodyV.paymentNo
        if(bodyV.paymentNo === null || bodyV.paymentNo == ""){
            paymentNo =GenerateSquencePaymentNo()
        }
        try {
            let data = await Payment.Create({
                paymentNo: paymentNo,
                businesspartner_id: bodyV.businesspartner_id,
                fakturno: bodyV.fakturno,
                dueDate: bodyV.dueDate,
                paymentDate: bodyV.paymentDate,
                grandTotal: bodyV.grandTotal
            })
            res.status(200).json ({
                status: 'succsess',
                msg: `payment ${paymentNo} succsess generated`,
                data
            })
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(403)
                res.send({ 
                    status: 'error', 
                    msg: `payment with paymentNo ${paymentNo} already exists`
                });
            } else {
                res.status(500)
                res.send({ 
                    status: 'error', 
                    msg: "Something went wrong"
                });
            }
        }
    },
    Update: async(req,res) => {
        let bodyV = req.body
        let paymentNo = bodyV.paymentNo
        try {
            let data = await Payment.Create({
                paymentNo: paymentNo,
                businesspartner_id: bodyV.businesspartner_id,
                fakturno: bodyV.fakturno,
                dueDate: bodyV.dueDate,
                paymentDate: bodyV.paymentDate,
                grandTotal: bodyV.grandTotal
            })
            res.status(200).json ({
                status: 'succsess',
                msg: `payment ${paymentNo} succsess generated`,
                data
            })
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(403)
                res.send({ 
                    status: 'error', 
                    msg: `payment with paymentNo ${paymentNo} already exists`
                });
            } else {
                res.status(500)
                res.send({ 
                    status: 'error', 
                    msg: "Something went wrong"
                });
            }
        }
    },
    Delete: async(req,res) => {
        let bodyV = req.body
        let data = await Payment.findByPk(bodyV.businesspartner_id)
        let paymentNo = data.paymentNo
        try {
            await data.destroy()
            res.status(200).json({
                status: `success`,
                msg:`data payment ${paymentNo} success deleted`
            })
        } catch (err) {
            res.status(401).json({
                status: `erorr`,
                msg: err.message
            })
        }
    }
}