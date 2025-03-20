const User = require("@/model/UserModel.js");
const mongoose = require('mongoose');
const userSevices = {
    login : (data) => {

        // Call user service API to login
        // Return promise
        // Fake promise production
        return new Promise((resolve, reject) => {
            // Simulate API call
            setTimeout(() => {
                console.log(data);
                resolve(data);
                // if(data.username === 'admin' && data.password === 'secret'){
                //     resolve({token: 'admin-token'});
                // } else {
                //     reject('Invalid username or password');
                // }
            }, 1000);
        });
    }
}
module.exports = userSevices