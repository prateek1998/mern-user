'use strict';
/**
 * Module dependencies
 */
let User = require('../models/User.model'),
    errorHandler = require('../helpers/dbErrorHandler');

// Method to push new User
exports.createUser = function (req, res) {
    let data = req.body;
    // console.log(req.body)
    // return;
    let userData = new User(data);
    userData.save(function (err, result) {
        if (err) {
            console.log("error----------", err);
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        } else {
            let outputResult = {
                id: result._id,
                name: result.name,
                phone: result.phone,
            }
            res.status(201).send({
                status: 1,
                "message": "User added successfully",
                data:outputResult
            })
        }
    });
}

// Method to get all Users
exports.getAllUsers = function (req, res) {
    let data = req.body;
    let sort = {}, matchQuery ={};
    sort['_id'] = -1;    
    // if(data.radixDepartment)
    //     matchQuery.radixDepartment = data.radixDepartment;
    // if(data.organization)
    //     matchQuery.organization = data.organization;
    // if(data.source)
    //     matchQuery.source = data.source;
    // if(data.center)
    //     matchQuery.center = data.center;
    // if(data.category)
    //     matchQuery.category = data.category;
    // if(data.status)
    //     matchQuery.status = data.status;    
    // if(data.priority)
    //     matchQuery.priority = data.priority;    
    // if(data.startDate && data.endDate)
    //     matchQuery.date = { $gte: new Date(data.startDate), $lte: new Date(data.endDate) };
    if(data.search){
        let regx = new RegExp(data.search, "i");
        matchQuery.name = {
            $regex: regx
        };
    }
    // console.log(data);
    // console.log(matchQuery);
    // console.log(limit, skip, searched);
    // return
    User.aggregate(
        [{
            "$project": {
                "_id": "$_id",
                "name": "$name",
                "joined_date": "$joined_date",
                "phone": "$phone",
                "organization": "$organization",
                "email": "$email",      
            }
        },
        {
            $match: matchQuery
        },
        {
            "$sort": sort
        }], function (err, users) {        
        if (err) {
            return res.status(400).send({
                status: 0,
                message: errorHandler.getErrorMessage(err)
            })
        }
        if (users.length) {
            return res.json({
                status: 1,
                "total records": users.length,
                data:users
            });
        }
        return res.status(200).send({
            status: 1,
            message: 'No data found'
        })
    })
}

// Method to get a particular User by ID
exports.getUserDetails = function (req, res) {
    let userId = req.params.id;
    User.findOne({ _id: userId }).exec(function (err, user) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message:"User Id not correct"
            })
        }
        if (user) {
            return res.status(200).send({
                status: 1,
                data:user
            })
        }
        return res.status(200).send({
            status: 1,
            message: 'No user Stored with this ID'
        })
    })
}

// Method to update User by Id
exports.updateUser = function (req, res) {
    let data = req.body;
    User.findOne({ _id: data._id }).exec(function (err, user) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'User Id is not correct'
            })
        }
        if (user) {
            if (data.name) {
                user.name = data.name
            }
            if (data.phone) {
                user.phone = data.phone;
            }
            if(data.email){
                user.email=data.email;
            }
            user.save(function (err, result) {
                if (err) {
                    console.log("error----------", err);
                    return res.status(400).json({
                        error: errorHandler.getErrorMessage(err)
                    })
                } else {
                    let outputResult = {
                        id: result._id,
                        name: result.name,
                        phone: result.phone,
                    }
                    res.status(201).send({
                        status: 1,
                        "message": "User updated successfully",
                        data:outputResult
                    })
                }
            });
        } else {
            return res.json({
                status: 0,
                message: 'No User stored with this Id'
            })
        }
    })
};

// Method to delete a particular User
exports.deleteUser = function (req, res) {
    let userId = req.params.id;
    User.findOneAndDelete({ _id: userId }).exec(function (err, user) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: errorHandler.getErrorMessage(err)
            })
        }
        if (user) {
            res.json({
                status: 1,
                message: "User deleted successfully",
                data: user
            })            
        } else {
            return res.status(200).send("No User data found with this Id")
        }
    })
}

// Method to delete all Users
exports.deleteAllUsers = function (req, res) {
    User.deleteMany({}).exec(function (err, users) {
        if (err) {
            return res.status(400).send({
                status: 0,
                message: 'No User found'
            })
        }
        res.send({
            status: 1,
            message: "All users successfully deleted",
        })
    })
}
