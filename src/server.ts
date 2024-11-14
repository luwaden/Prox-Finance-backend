import app from "./config/app.config";
import colors from "colors";
import connectDB from "./config/db.config";
import v1Router from "./routes/v1/routes.router";

const connect = async (): Promise<void> => {
  //connect database
  await connectDB();
};
//call the function
connect();

const PORT = process.env.PORT || 5000;

app.use("/api", v1Router);

const server = app.listen(PORT, () => {
  console.log(
    colors.bold.yellow(`Node server running in ${process.env.NODE_ENV} mode`)
  );
});

process.on("unhandledRejection", (err: any, promise) => {
  console.log(colors.bold.red(`Error: ${err.message}`));
  server.close(() => process.exit(1));
});
