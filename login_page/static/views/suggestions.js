console.log("suggestions.js is started");

axios.get('/api/suggestload')
.then((res) => {
    console.log(res.data);
    res.data.forEach((e) => {
    addElement(e.title, e.text);
    });
})
.catch((err) => {
    alert('DB error');
});

function addElement(title, content){
    const newdiv = document.createElement('div');
    newdiv.className = 'card cards';
    newdiv.innerHTML=`
    <div class="card-body">
        <div class="title">
            <h3 class="title1">${title}</h3>
        </div>
        <div class="des">
            <div class="card inner">
                
                <p style="margin-left: 7px">${content}</p>
            </div>
        </div>
        <div class="button">
            <button>Read More...</button>
        </div>
    </div>
    `;
    document.getElementById('main').appendChild(newdiv);
}