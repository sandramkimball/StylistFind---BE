const db = require('../database/dbConfig.js');


module.exports = {
  add,
  addPost,
  find,
  findBy,
  findById,
  findByIdPublic,
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
  return db('stylists')
  .select('*')
  .join('salons', 'salons.stylist_id', '=', 'stylists.id')
  ;
}

function findBy(filter) {
  return db('stylists')
    .where(filter)
    .first();
}

function findById(id) {
  return db('stylists')
    .select('*')
    .where({id}) 
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
