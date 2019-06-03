console.log("notice.js is started");

axios.get('/api/noticeload')
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
    newdiv.className = 'cards';
    newdiv.innerHTML=`
    <div class="title">
        <h1>${title}</h1>
    </div>
    <div class="des">
        <p class="card">${content}</p>
    </div>
    <div class="button">
        <button>Read More...</button>
    </div>
    `;
    document.getElementById('main').appendChild(newdiv);
}