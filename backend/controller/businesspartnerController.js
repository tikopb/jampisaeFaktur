let { Businesspartner } = require('../models');

/**
 * Generating value of businesspartner.value with getting the last count of combine name and org.
 * @param {*} name 
 * @param {*} org_id 
 * @returns 
 */
async function GenerateValueGenerator(name){
    let value = GetAcronymn(name)
    let countBpList = await Businesspartner.findAll({
        where: {
            value: {
                [Op.like]: value + '%'
            }
        }
    })
    if(countBpList.length > 0 ){
        let lastNumber = countBpList.length+1
        value = value + '-' + lastNumber
    }
    return value.toUpperCase();
}

/**
 * generating acrynoym on str variabel
 * @param {*} str
 */
function GetAcronymn( str ) {
    return str.split( /\b(?=[a-z])/ig ) // split on word boundaries
      .map( token => token[0] )         // get first letter of each token
      .join( '' ).toUpperCase()         // convert to uppercase string
    ;
}

module.exports = {
    Get: async (req,res) => {
        let data = await Businesspartner.findAll();
        res.status(200).json({
            status: 'succsess',
            msg: 'get succsess',
            data
        })
    },
    GetByid: async (req,res) => {
        if(req.body.businesspartner_id === null){
            res.status(500).json({
                status: 'erorr',
                msg: 'businesspartner_id variabel is null'
            })
        }
        let data = await Businesspartner.findByPk(req.body.businesspartner_id)
        res.status(200).json({
            status: 'succsess',
            msg: 'get succsess',
            data
        })
    },
    Generate: async(req,res) => {
        let bodyV = req.body
        let valueP = bodyV.value
        if(valueP == null || valueP === ""){
            valueP = await GenerateValueGenerator(bodyV.name)
            console.log("value = " + valueP)
        }
        try {
            let data = await Businesspartner.create({
                value: valueP,
                name: bodyV.name,
                description: bodyV.description
            })
            res.status(200).json({
                status: 'succsess',
                msg: 'get succsess',
                data
            })
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(403)
                res.send({ 
                    status: 'error', 
                    msg: `Business Partner with value ${valueP} already exists`
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
        let data = await Businesspartner.findByPk(bodyV.businesspartner_id)
        try {
            data.set({
                value: valueP,
                name: bodyV.name,
                description: bodyV.description
            }).then(function(data){
                res.status(200).json({
                    status: 'succsess',
                    msg: 'get succsess',
                    data
                })
            })
        } catch (err) {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(403)
                res.send({ 
                    status: 'error', 
                    msg: `Business Partner with value ${valueP} already exists`
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
        const{Businesspartner_id} = req.body
        let data = await Businesspartner.findByPk(Businesspartner_id)
        let name = data.name
        try {
            await data.destroy()
            res.status(200).json({
                status: `success`,
                msg:`data ${name}  success deleted`
            })
        } catch (err) {
            res.status(401).json({
                status: `erorr`,
                msg: err.message
            })
        }
    }
}