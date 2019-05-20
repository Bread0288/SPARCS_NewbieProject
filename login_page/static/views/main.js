console.log('main.js start');


function sign_in() {
    const name = document.getElementById('id').value;
    const password = document.getElementById('password').value;
    console.log('name : ' + name + 'password : ' + password);
    axios.post('/api/sign_in', {id : name, pw: password})
    .then((res) => {
        document.getElementById("form").reset();
    }).catch((err) => {
        alert('DB error');
    });
}