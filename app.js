// Happy coding guys

const express = require("express")
const app = express()
const port = 5050
const Routes = require("./route/index")
require("./models")

app.set("view engine", "ejs")

app.use(express.json())

app.use(express.urlencoded({ extended: false }))
app.use(express.static("public"))
app.use("/", Routes)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
