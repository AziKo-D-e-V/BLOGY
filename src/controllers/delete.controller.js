const pg = require("../libs/pg");

const deleteBlog = async (req, res) => {
  const { id } = req.params;
console.log(id);
  try {
    const deletes = await pg(`DELETE FROM blogs WHERE id = '${id}'`);

    if (deletes.length == 0) {
      return res.status(404).json({ message: '404 Not Found' });
    }
  res.status(200).json({ message: 'succes' });
  } catch (error) {
    console.log(error);

  }
};

module.exports = { deleteBlog };
