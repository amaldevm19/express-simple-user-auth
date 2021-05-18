const mongoose  = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const User_Schema = new Schema({
    user_name: String,
    email:String,
    password:String
})


User_Schema.pre("save", function (next){

    if (this.isModified("password") || this.isNew){
        bcrypt.genSalt(10, (error, salt)=>{
            if(error){
                return next(error)
            }else{
                bcrypt.hash(this.password, salt, (error, hash)=>{
                    if(error){
                        return next(error)
                    }
                    this.password = hash;
                    next();
                })
            }
        })
    } else {
        return next();
    }
});

User_Schema.methods.comparePassword = function (password, cb){
    bcrypt.compare(password, this.password, function (error, isMatch){
        if(error){
            return cb(error)
        } else {
            cb(null, isMatch )
        }
    })
}

module.exports = mongoose.model('User', User_Schema);

