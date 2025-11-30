const USERS_KEY = 'civis_users';
const CURRENT_USER_KEY = 'civis_current_user';

function _readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function _writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser({ username, email, password }) {
  const users = _readUsers();
  const exists = users.find(u => u.username === username || u.email === email);
  if (exists) {
    return { success: false, message: 'User with that username or email already exists' };
  }
  const newUser = { username, email, password };
  users.push(newUser);
  _writeUsers(users);
  // set current user (without password)
  const publicUser = { username, email };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(publicUser));
  return { success: true, user: publicUser };
}

export function authenticate(username, password) {
  const users = _readUsers();
  const found = users.find(u => (u.username === username || u.email === username) && u.password === password);
  if (!found) return { success: false };
  const publicUser = { username: found.username, email: found.email };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(publicUser));
  return { success: true, user: publicUser };
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getAllUsers() {
  return _readUsers();
}
