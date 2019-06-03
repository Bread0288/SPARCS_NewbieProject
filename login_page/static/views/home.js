console.log('home.js start');

axios.get('/api/suggestload')
.then((res) => {
    let i = 0;
  console.log(res.data);
  res.data.reverse().forEach((e) => {
      if(i < 5){
        addElementSuggestions(e.title, e.date);
        i++;
      }
    
  });
})
.catch((err) => {
  alert('DB error');
});

axios.get('/api/noticeload')
.then((res) => {
    let i = 0;
  console.log(res.data);
  res.data.reverse().forEach((e) => {
    if(i < 4){
        addElementNotice(e.title, e.date);
        i++;
      }
    
  });
})
.catch((err) => {
  alert('DB error');
});

function submitText(){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    const yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd;
    } 
  
    if(mm<10) {
        mm='0'+mm;
    }

    today = yyyy+'/' + mm +'/' +dd;
    console.log(today);
    const suggest_check = document.getElementById('suggest').checked;
    const notice_check = document.getElementById('notice').checked;
    const dormitory = document.getElementById('selectDor').value;
    const title = document.getElementById('title').value;
    const context = document.getElementById('context').value;
    console.log(dormitory);
    axios.post('/api/load', { check1: suggest_check, check2: notice_check, dormitory: dormitory, title: title, text:context, date:today }).then((res) => {
        console.log(res);
        if(suggest_check == true){
            alert("건의사항에 글쓰기가 완료되었습니다");
            //addElementSuggestions(title, context);
        }
        if(notice_check == true){
            alert("공지사항에 글쓰기가 완료되었습니다");
            //addElementNotice(title, context);
        }
        document.getElementById('suggest').checked = false;
        document.getElementById('notice').checked = false;
        document.getElementById('title').value = "";
        document.getElementById('context').value = "";
    }).catch((err) => {
        console.log("error: " + err);
        alert('DB error');
    });
}

function addElementSuggestions(title, context){
    var date = new Date(); 
    var string = date.toLocaleString();
    const newtr = document.createElement('TR');
    newtr.className = 'suggestRow';
    newtr.style = ''

    const tr1 = document.createElement('TD');
    tr1.innerHTML = title;
    tr1.className = 'title';

    const tr2 = document.createElement('TD');
    tr2.innerHTML = context;
    tr2.className = 'when';

    newtr.appendChild(tr1);
    newtr.appendChild(tr2);

    document.getElementById('sugBody').appendChild(newtr);
}

function addElementNotice(title, context){
    var date = new Date(); 
    var string = date.toLocaleString();
    const newtr = document.createElement('TR');
    newtr.className = 'noticeRow';

    const tr1 = document.createElement('TD');
    tr1.innerHTML = title;
    tr1.className = 'title';

    const tr2 = document.createElement('TD');
    tr2.innerHTML = context;
    tr2.className = 'when';

    newtr.appendChild(tr1);
    newtr.appendChild(tr2);

    document.getElementById('notBody').appendChild(newtr);
}