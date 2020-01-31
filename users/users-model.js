const db = require('../database/dbConfig.js');

module.exports = {
  add,
  addPost,
  find,
  findBy,
  findById,
  findReviewsById,
  remove,
  removePost,
};

//ADD
async function add(user) {
  const [id] = await db('users').insert(user, 'id');

  return findById(id);
}

async function addPost(post, user) {
  const [id] = await db('posts')
  .where('post.user_id', '=', `${user.id}`)
  .insert(post, 'id');

  return findPostById(id);
}


//FIND
function find() {
  return db('users').select('*');
}

function findBy(filter) {
  return db('users').where(filter);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

function findReviewsById(id) {
  return db('reviews')
    .join('users', 'reviews.user_id', '=', 'reviews.id')
    .select('reviews.*', 'users.id as user')
    .where({ id })
}


//DELETE
function remove(id) {
  return db('users')
    .where({ id })
    .del();
}

function removePost(id) {
  return db('posts')
    .join('users', 'posts.user_id', '=', 'users.id')
    .where({ id })
    .del();
}
