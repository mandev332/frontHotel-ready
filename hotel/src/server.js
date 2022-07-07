import express from "express";
import path from "path";
import ejs from "ejs";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.static(path.join(process.cwd(), "public")));
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.set("views", path.join(process.cwd(), "views"));
app.get("/login", (req, res) => res.render("login"));
app.get("/customer", (req, res) => res.render("customer"));
app.get("/admin", (req, res) => res.render("admin"));
app.get("/favicon.ico", (req, res) => res.end(""));

app.listen(PORT, () => console.log("Front run is http://localhost:" + PORT));
