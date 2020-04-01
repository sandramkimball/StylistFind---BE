const db = require('../database/dbConfig.js');

module.exports = {
  add,
  addReview,
  find,
  findBy,
  findById,
  findReviewById,
  remove,
  removeReview,
};

//ADD
async function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

async function addReview(review, user) {
  const [id] = await db('reviews')
  .where('review.user_id', '=', `${user.id}`)
  .insert(review, 'id');

  return findReviewById(id);
}


//FIND
function find() {
  return db('users').select('*');
}

function findBy(filter) {
  return db('users').where(filter).first();
}

function findById(id) {
  return db('users')
    .select('*')
    .where({ id })
    .first()
}

function findReviewById(id) {
  return db('reviews')
    .join('users', 'reviews.user_id', '=', 'users.id')
    .select('reviews.*', 'users.id as user')
    .where({ id })
}


//DELETE
function remove(id) {
  return db('users')
    .where({ id })
    .del();
}

function removeReview(id) {
  return db('reviews')
    .join('users', 'reviews.user_id', '=', 'users.id')
    .where({ id })
    .del();
}
