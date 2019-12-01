const db = require('../database/dbConfig.js');

module.exports = {
  add,
  addPost,
  find,
  findBy,
  findById,
  findPostById,
  remove,
  removePost,
};

//ADD
async function add(stylist) {
  const [id] = await db('stylists').insert(stylist, 'id');

  return findById(id);
}

async function addPost(post, stylist) {
  const [id] = await db('posts')
  .where('post.stylist_id', '=', `${stylist.id}`)
  .insert(post, 'id');

  return findPostById(id);
}


//FIND
function find() {
  return db('stylists').select('*');
}

function findBy(filter) {
  return db('stylists').where(filter);
}

function findById(id) {
  return db('stylists')
    .where({ id })
    .first();
}

function findPostById(id) {
  return db('posts')
    .join('stylists', 'posts.stylist_id', '=', 'stylists.id')
    .select('posts.*', 'stylists.id as stylist')
    .where({ id })
    .first();
}


//DELETE
function remove(id) {
  return db('stylists')
    .where({ id })
    .del();
}

function removePost(id) {
  return db('posts')
    .join('stylists', 'posts.stylist_id', '=', 'stylists.id')
    .where({ id })
    .del();
}
