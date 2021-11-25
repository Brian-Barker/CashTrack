import AsyncStorage from '@react-native-async-storage/async-storage';

export const request = async (method, body) => {
  let res = await fetch('http://66.231.152.109/' + method, {
    credentials: 'same-origin',
    headers: {
      accept: 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/json;charset=UTF-8',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
    },
    referrerPolicy: 'no-referrer-when-downgrade',
    body: JSON.stringify(body),
    method: 'POST',
    mode: 'cors',
  });
  res = await res.json();
  return res;
};

// -------- User Creation and Login ------------ //

// Get user token from storage
export const fetchUserToken = async () => {
  return await AsyncStorage.getItem('token');
};

// Get user token from backend, place in storage
export const loginUser = async (username, password) => {
  console.log(username, password);
  let res = await request('users/login', {
    username: username,
    password: password,
  });
  await AsyncStorage.setItem('token', res.token);
  console.log(res);
  return res;
};

// Create new user, return token
export const createUser = async (
  firstname,
  lastname,
  username,
  password,
  email,
) => {
  return await request('users/create', {
    firstname: firstname,
    lastname: lastname,
    username: username,
    password: password,
    email: email,
  });
};

export const getUser = async () => {
  let token = await fetchUserToken();
  return await request('users/getUser', {
    token: token,
  });
};

export const fetchPlaceData = async (token, latitude, longitude) => {
  console.log(token, latitude, longitude);
  return await request('places', {
    token: token,
    latitude: latitude,
    longitude: longitude,
  });
};
