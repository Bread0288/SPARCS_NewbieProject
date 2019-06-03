console.log("suggestions.js is started");

axios.get('/api/suggestload')
.then((res) => {
    console.log(res.data);
    res.data.forEach((e) => {
    addElement(e.title, e.text, e.dormitory);
    });
})
.catch((err) => {
    alert('DB error');
});

function addElement(title, content, dormitory){
    const newdiv = document.createElement('div');
    newdiv.className = 'card cards';
    newdiv.innerHTML=`
    <div class="card-body">
        <div class="title">
            <h3 class="title1">${title}</h3>
        </div>
        <p align="right" style="margin-left: 7px; margin-bottom: 5px">${dormitory}</p>
        <div class="des">
            <div class="card inner">
                <p style="margin-left: 7px">${content}</p>
            </div>
        </div>
    </div>
    `;
    document.getElementById('main').appendChild(newdiv);
}

function showDetails(){
    window.open("detail.html", "details", "width=600, height=500, left=100, top=50");
}