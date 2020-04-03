const db = require('../database/dbConfig.js');

module.exports = {
  addStylist,
  addPost,
  addSalon,
  find,
  findStylistBy,
  findStylistById,
  findPostById,
  findSalonById,
  remove,
  removePost,
};

//ADD
async function addStylist(stylist) {
  return db('stylists')
    .insert(stylist, 'id')
    .then(ids => {
      const [id] = ids;
      return findStylistById(id);
    });
}

async function addPost(post, stylist) {
  const [id] = await db('posts')
  .where('post.stylist_id', '=', `${stylist.id}`)
  .insert(post, 'id');

  return findPostById(id);
}

async function addSalon(salon) {
  return db('salons')
    .insert(salon, 'id')
    .then(ids => {
      const [id] = ids;
      return findSalonById(id);
    });
}


//FIND
function find() {
  return db('stylists')
  .select('*')
  .join('salons', 'salons.stylist_id', '=', 'stylists.id')

}

function findStylistBy(filter) {
  return db('stylists').where(filter).first();
}

function findStylistById(id) {
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

function findSalonById(id) {
  return db('salons')
    .select('*')
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
