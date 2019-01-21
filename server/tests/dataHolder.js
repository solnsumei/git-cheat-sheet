export const User = (name, email, password, isAdmin = false) => ({
  name,
  email,
  password,
  isAdmin,
});

export const Category = name => ({
  name,
});

export const Command = (snippet, action, category, user) => ({
  snippet,
  action,
  category,
  user
});