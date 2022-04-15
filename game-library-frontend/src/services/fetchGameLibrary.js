const URL_FETCH = 'http://localhost:3001/';
const APLICATION = 'application/json';

async function createUser({
  name, lastName, email, password, avatar,
}) {
  try {
    const response = await fetch(`${URL_FETCH}user`, {
      method: 'POST',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
      },
      body: JSON.stringify({
        name,
        lastName,
        email,
        password,
        avatar,
      }),
    });
    const results = await response.json();
    return results;
  } catch (error) {
    return { error };
  }
}

async function loginUser({ email, password }) {
  try {
    const response = await fetch(`${URL_FETCH}user/login`, {
      method: 'POST',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const results = await response.json();
    return results;
  } catch (error) {
    return { error };
  }
}

async function getUser(token) {
  try {
    const response = await fetch(`${URL_FETCH}user`, {
      method: 'GET',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
        Authorization: token,
      },
    });
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

async function getCollection(token, id) {
  try {
    const response = await fetch(`${URL_FETCH}collections/${id}`, {
      method: 'GET',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
        Authorization: token,
      },
    });
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

async function getCategories(token) {
  try {
    const response = await fetch(`${URL_FETCH}categories`, {
      method: 'GET',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
        Authorization: token,
      },
    });
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

async function saveGameToCollection(token, { id, name, image }) {
  try {
    const response = await fetch(`${URL_FETCH}collections`, {
      method: 'POST',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
        Authorization: token,
      },
      body: JSON.stringify({
        id,
        name,
        image,
      }),
    });
    const results = await response.json();
    return results;
  } catch (error) {
    return { error };
  }
}
async function categoryUpdate(token, { gamesId, categoriesId }) {
  try {
    const response = await fetch(`${URL_FETCH}collections/update`, {
      method: 'PUT',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
        Authorization: token,
      },
      body: JSON.stringify({
        gamesId,
        categoriesId,
      }),
    });
    const results = await response.json();
    return results;
  } catch (error) {
    return { error };
  }
}

async function removeFromCollection(token, { gamesId }) {
  try {
    const response = await fetch(`${URL_FETCH}collections/delete`, {
      method: 'DELETE',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
        Authorization: token,
      },
      body: JSON.stringify({
        gamesId,
      }),
    });
    const results = await response.json();
    return results;
  } catch (error) {
    return { error };
  }
}

async function getUserGames(token, page, id) {
  try {
    const response = await fetch(`${URL_FETCH}collections/user/${page}/${id}`, {
      method: 'GET',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
        Authorization: token,
      },
    });
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

async function updateUser(token, {
  name, lastName, password, avatar,
}) {
  try {
    const response = await fetch(`${URL_FETCH}user/update`, {
      method: 'PUT',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
        Authorization: token,
      },
      body: JSON.stringify({
        name,
        lastName,
        password,
        avatar,
      }),
    });
    const results = await response.json();
    return results;
  } catch (error) {
    return { error };
  }
}

async function deleteUser(token) {
  try {
    const response = await fetch(`${URL_FETCH}user/delete`, {
      method: 'DELETE',
      headers: {
        Accept: APLICATION,
        'Content-Type': APLICATION,
        Authorization: token,
      },
    });
    const results = await response.json();
    return results;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export default {
  createUser,
  loginUser,
  getUser,
  getCollection,
  getCategories,
  saveGameToCollection,
  categoryUpdate,
  removeFromCollection,
  getUserGames,
  updateUser,
  deleteUser,
};
