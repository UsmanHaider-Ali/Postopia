const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.json({ message: "Server is running" }));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
