export default function isLoggedIn() {
    const isLoggedIn = localStorage.getItem('token')
    return isLoggedIn;
}