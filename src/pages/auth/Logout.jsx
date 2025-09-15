function handleLogout() {
  localStorage.removeItem("token"); // clear session
  window.location.href = "/login";  // redirect to login
}
export default handleLogout;