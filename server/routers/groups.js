//api/v1/group -> get all groups we dont want this
//api/v1/groups/1 ->get all groups by uid=1
//POST api/v1/groups/userID and the group in the body

const express = require('express')
const groupsRoute = express.Router()
const {getUserGroups,createGroup,deleteGroup} = require('../controllers/groupsController')

groupsRoute.get('/:userID',getUserGroups)
groupsRoute.post('/:userID',createGroup)
groupsRoute.delete('/:groupID',deleteGroup)

module.exports = groupsRoute