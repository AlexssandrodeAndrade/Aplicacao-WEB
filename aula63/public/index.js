const token = localStorage.getItem('token');

if (token) {
    window.location.replace('/usuarios/usuarios.html');
}
