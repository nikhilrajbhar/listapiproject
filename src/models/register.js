const mongoose = require("mongoose");

const customers = new mongoose.Schema({ 
    fname : {
        type:String,
        required:true
    },

    email: {
        type:String,
        required:true,
        unique:true
    },

    password : {
        type:String,
        required :true
    },

    cpassword : {
        type:String,
        required :true
    },

    apiinformation : {
        referal : String,
        websites : String,
        signup: {
            email: String
            
          }
      
    }

})
 
// collections

const Register = new mongoose.model("Register", customers);
module.exports = Register;  