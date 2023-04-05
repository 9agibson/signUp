const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https")
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){
    const firstName = req.body.first;
    const lastName = req.body.last;
    const email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/ee5b3245b1";
    const options = {
        method: "POST",
        auth: "aaron1:7c05a6ea782f035c2dc3332d995e509e-us17"
    }

    const request = https.request(url, options, function(response) {
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
    console.log("app is running on port 3000")
})

//api Key
//7c05a6ea782f035c2dc3332d995e509e-us17

//audience ID
//ee5b3245b1