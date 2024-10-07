import "dotenv/config";
import express from "express";
import router from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT || 3030;
app.use(express.json());

app.get('/', (req, res) => {
    return res.send('Hi Everyone')
})

app.use(router);

app.listen(PORT, () => console.log(`listening on port ${PORT}`))