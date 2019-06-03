console.log("notice.js is started");

axios.get('/api/noticeload')
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

function listText() {
  const list = document.getElementsByClassName('cards');
  // list[0].childNodes[1].add("hide")
  console.log(list);
  for(let i=0; i<list.length; i++){
      if(document.getElementById('selectDor').value != list[i].childNodes[1].childNodes[3].innerHTML){
          list[i].className += " " + "hide";
      }
  }
}