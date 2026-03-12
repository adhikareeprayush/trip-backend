import app from "./app.js";
import { connectDB } from "./configs/db.config.js";

const PORT = 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running`);
});
