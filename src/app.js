const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 80;
const hbs = require("hbs");
const { registerPartial, registerPartials } = require("hbs");


//Database Connection
require("./db/conn")

//Database collection/model
const Register = require("./models/register");




//setting the path
const staticpath = path.join(__dirname,"../public");
const templatepath = path.join(__dirname,"../templates/views");
const partialspath = path.join(__dirname,"../templates/partials");

// console.log(path.join(__dirname,"../public"))

//Middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.static(staticpath)) 
app.set("view engine", "hbs");
app.set("views",templatepath);
hbs.registerPartials(partialspath);
//get json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//routing
//app.get(path,callback)



//User Registration
app.post("/register", async (req, res) => {
    try {

        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password == cpassword) {
            const registerusers = new Register({
                fname: req.body.name,
                email: req.body.email,
                password: req.body.password,
                cpassword: req.body.cpassword

            })

            const registered = await registerusers.save();
            res.render("index")
        }
        else {
            res.send("pass not maching")
        }

    } catch (error) {
        res.status(400).send(error);
    }
})

//User Login
app.post("/login", async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({ email: email });

        if (useremail.password === password) {
            res.render("dashboard",{
                UserName : useremail.fname});
        } else {
            res.send("password Invalid")
        }


    } catch (error) {
        res.send(400).send(`Inavalid email`)
    }
})

//Forgot password
app.post("/forgot_password", async (req, res) => {
    try {
        const email = req.body.email;
        var new_email = { $set: { email: "nikhilrajbhar013@gmail.com" } };
        const fuseremail = await Register.findOneAndUpdate(email, new_email);

        console.log(fuseremail);
        if (fuseremail.email === email) {
            res.send(" Success");
        } else {
            res.send("Email Invalid")
        }
        console.log(email);

    } catch (error) {
        res.send(400).send(`Inavalid email`)

    }
})


// Create New waitlist
app.post("/apiinfo", async(req,res) =>{
    try {
        var fname = 'NikhilRajbhar';
        const fuseremail1 = await Register.findOne({ fname: fname });
        console.log(fuseremail1._id);

        var myid = fuseremail1._id;
        const newuseremail = await Register.findByIdAndUpdate(myid, { apiinformation :{
            referal : req.body.referal,
            
            websites : req.body.websites,
            signup: {
                email: 'getwaitlist.com'
                
              }
          
        } });
            console.log(req.body.websites);
            console.log(req.body.referal);
        res.send('success')

        
    } catch (error) {
        res.send(400).send(`Invalid `)
    }
} )

//Fetch waitlist
app.get("/apiinformation", async(req,res)=>{ 
    try {
        const email = "nikhilrajbhar013@gmail.com";
        const data = await Register.findOne({ email: email });
       
        res.render("dashboard",{
            referal : data.apiinformation.referal,
            websites : data.apiinformation.websites

        });
        
    } catch (error) {
        res.send(400).send(`Invalid `)
    }
   
});

//render homepage
app.get("/",(req,res)=>{
    res.render("index",{
        UserName : " Nikhil Rajbhar",
    });
} )

//render contact page
app.get("/contact",(req,res)=>{
    res.render("contact");
})

//render dashboard page
app.get("/dashboard",(req,res)=>{
    res.render("dashboard");
})

//render forgot page
app.get("/forgot", (req,res)=>{
    res.render("forgot");
} )

//server create
app.listen(port, ()=>{
    console.log(`Server is running on port no ${port}`);
} )
