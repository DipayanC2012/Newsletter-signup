const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const request = require("request");
const https = require("https");
const { response } = require("express");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us5.api.mailchimp.com/3.0/lists/17d44ab9d8";
  const options = {
    method: "POST",
    auth: "Dipayan:4e17fb7146f8932d2bfa8a5e7a3ca5fa-us5",
  };

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});
app.post("/failure", function (req, res) {
  res.redirect("/");
});
app.listen(3000, function (req, res) {
  console.log("Server is running on port 3000");
});

// api key
// b62441a63c5cf66add4798e32776fd75-us5

// list Id
// 17d44ab9d8
