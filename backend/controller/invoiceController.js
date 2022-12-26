let { Invoice } = require('../models');
const { Op } = require("sequelize");

module.exports = {
    Get: async(req,res) => {
        let data = await Invoice.findAll()
        res.status(200).json({
            status: 'succsess',
            msg: 'get succsess',
            data
        })
    },
    GetById: async (req,res) => {
        if(req.body.invoice_id === null){
            res.status(500).json({
                status: 'erorr',
                msg: 'invoice_id variabel is null'
            })
        }
        let data = await Invoice.findByPk(req.body.invoice_id)
        res.status(200).json({
            status: 'succsess',
            msg: 'get succsess',
            data
        })
    },
    Generate: async(req,res) => {
        let bodyV = req.body
        try {
            let data = await Invoice.Create({
                businesspartner_id: bodyV.businesspartner_id,
                invoice_id: bodyV.invoice_id,
                fakturno: bodyV.fakturno,
                dueDate: bodyV.dueDate,
                paymentDate: bodyV.paymentDate,
                grandTotal: bodyV.grandTotal,
                isactive: true
            })
            res.status(200).json({
                status: 'succsess',
                msg: 'create data succsess',
                data
            })
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(403)
                res.send({ 
                    status: 'error', 
                    msg: `invoice with fakturNo ${bodyV.fakturno} already exists`
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
        let data = await Invoice.findByPk(bodyV.invoice_id)
        try {
            data.set({
                businesspartner_id: bodyV.businesspartner_id,
                invoice_id: bodyV.invoice_id,
                fakturno: bodyV.fakturno,
                dueDate: bodyV.dueDate,
                paymentDate: bodyV.paymentDate,
                grandTotal: bodyV.grandTotal,
                isactive: true
            })
            await data.save()
            res.status(200).json({
                status: 'succsess',
                msg: 'update data succsess',
                data
            })
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(403)
                res.send({ 
                    status: 'error', 
                    msg: `invoice with fakturNo ${bodyV.fakturno} already exists`
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
        let data = await Invoice.findByPk(bodyV.businesspartner_id)
        let fakturNo = data.fakturno
        try {
            await data.destroy()
            res.status(200).json({
                status: `success`,
                msg:`data invoice ${fakturNo} success deleted`
            })
        } catch (err) {
            res.status(401).json({
                status: `erorr`,
                msg: err.message
            })
        }
    }
}