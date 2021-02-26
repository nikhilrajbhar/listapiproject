const mongoose = require("mongoose");

//creating a database
mongoose.connect("mongodb+srv://nik:nik123@cluster0.ozcp8.mongodb.net/mydatabase1?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection Successful");
}).catch((error) => {
    console.log(error);
})