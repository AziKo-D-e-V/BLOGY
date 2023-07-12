const pg = require("../libs/pg");
const { v4: uuid } = require("uuid");
const path = require("path");

const blogs = async (req, res) => {
  const { title, description } = req.body;
  const { image } = req.files;
  console.log(req.body);
  const imagename = `${uuid()}${path.extname(image.name)}`;
  image.mv(process.cwd() + "/uploads/" + imagename);

  const username = await pg("select username from administrator where id = 1");

  await pg(
    `insert into blogs (username, title, description, image_id) values($1, $2, $3,$4)`,
    username[0].username,
    title,
    description,
    imagename
  );

  res.status(200).json({ message: "Successfully inserted blog" });
};

const contactus = async (req, res) => {
  const { name, email, subject, message } = req.body;

  await pg(
    "insert into messages (name, email, subject, message) values($1, $2, $3, $4)",
    name,
    email,
    subject,
    message
  );

  res.status(200).json({ message: "Successfully send message" });
};

const ShowContactUs = async (req, res) => {
  try {
    const msg = await pg("select message from messages");

    res.status(200).json({ message: "Successfully", data: msg[0].message});
  } catch (error) {
    console.log(error.message);
  }
};

const Comment = async (req, res) => {
  const cmt = await pg("select message from comments");

  res.status(200).json({ message: "Successfully", data: cmt})
}


const Comments = async (req, res) => {
  const {name, email, website, message} = req.body;

  await pg("insert into comments (name, email, website, message) values($1, $2, $3, $4)", name, email, website, message)

  res.status(200).json({message: "Successfully"})
}

module.exports = { blogs, contactus, ShowContactUs, Comments, Comment   };
