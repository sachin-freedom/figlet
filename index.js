const figlet = require("figlet");
const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();


require('dotenv').config();


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

let sachin = "";

app.post("/figlet", (req, res) => {
  let { yourName } = req.body;
  console.log(yourName);

  figlet(yourName, (err, data) => {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    sachin = data;
    console.log(data);

    // Only redirect after figlet is done
    res.redirect("/");
  });
});

app.get("/", (req, res) => {
  console.log(sachin);
  res.render("index", { sachin: sachin });
  sachin ='';
});

app.listen(port, () => {
  console.log(`Listnening on port ${port}`);
});
