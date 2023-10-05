function requireAuth(user) {
  if (!user) {
    return false;
  }
  return true;
}

export default requireAuth;
