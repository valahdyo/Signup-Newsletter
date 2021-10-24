const express = require("express");
const https = require("https");
const app = express();
app.use(express.static(__dirname));
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email

    const data = {members : [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }
    }]}

   const jsonData = JSON.stringify(data);
   const url = "https://us5.api.mailchimp.com/3.0//lists/a8695fd95e"
   const options = {
    method : "POST",
    auth: "vasus:c142509aa8732af0ba115157eb4aaf27-us5"
   }
   const request = https.request(url, options, function(response){
       console.log(response.statusCode)
    if (response.statusCode == 200){
        res.sendFile(__dirname + "/success.html")
    } else {
        res.sendFile(__dirname + "/failure.html")
    }
   })
   request.write(jsonData)
   request.end()
   
})

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port 3000")
})
