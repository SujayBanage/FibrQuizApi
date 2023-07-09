const isExists = async (db_model, _id, email, res) => {
  try {
    let results;
    results = email
      ? await db_model.find({ email })
      : await db_model.find({ _id });
    return results.length > 0
      ? { found: true, result: results[0] }
      : { found: false, result: null };
  } catch (err) {
    return res.status(err.statusCode).send({
      status: err.statusCode,
      message: err.message,
    });
  }
};

export default isExists;
