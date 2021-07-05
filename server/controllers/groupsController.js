const Group = require('../models/Group')

const getUserGroups = async (req,res) => {
    try {
        const {userID} = req.params
        const groups = await Group.find({userID:userID})
        return res.status(200).json({
            'success':true,
            data:groups
        })
    } catch (error) {
        return res.status(500).json({
            'success':false,
            'message':error
        })        
    }
}

const createGroup = async (req,res) => {
    try {
        const {userID} = req.params
        const {name,color,count} = req.body
        let group = {
            name,
            color,
            count,
            userID
        }
        group = await Group.create(group)
        return res.status(201).json({
            'success':true,
            'data':group            
        })
    } catch (error) {
        return res.status(500).json({
            'success':false,
            'message':error
        })
    }    
}

const deleteGroup = async (req,res) => {
    try {
        const {groupID} = req.params
        const group = await Group.findOneAndDelete({_id:groupID})
        return res.status(201).json({
            'success':true,
            'data':group            
        })
    } catch (error) {
        return res.status(500).json({
            'success':false,
            'message':error
        })
    }    
}

module.exports = {
    getUserGroups,
    createGroup,
    deleteGroup,
}