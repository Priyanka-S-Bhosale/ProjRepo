import logo from './logo.svg';
import './App.css';

function App() {
  // const [data, setdata] = useState({id: null, name: null});

  return (
      <div className="App">
        <header className="App-header">
          <h1>EMPLOYEES</h1>
          <form id ="myForm">
          <input type="number" placeholder="id" id = "id"></input><br></br>
          <input type="text" placeholder="name" id="name"></input>
          
          </form>
          <button onClick={callApi}>Refresh</button>
          <table id = "data" border="1">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </table>
        </header>
      </div>
  );
}



function callApi() {
    let id = document.getElementById('id').value;
    let name = document.getElementById('name').value;

    if(!(id==null || name==null || name=="")){
    fetch("http://localhost:3001/insert", {
           method: "POST",
             body: JSON.stringify({
          id: id,
          name: name,
      }),
             headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
  })
     .then(response => response.json())
     .then(json => console.log(json));

    }
    fetch('http://localhost:3001/details', { method: 'GET' })
        .then(data => data.json())
        .then(json => function(){
          // alert(JSON.stringify(json));
          let tab = document.getElementById('data');
          tab.innerHTML =`<tr>
          <th>ID</th>
          <th>Name</th>
          <th>Action</th>
        </tr>`;
          for(let i = 0; i< json.length; i++){
            let row = document.createElement('tr');
            let idcol = document.createElement('td');
            let nmcol = document.createElement('td');
            let delcol = document.createElement('td');
            let delbut = document.createElement('button');

            delbut.innerHTML="Delete";
            delbut.id = idcol.value;
            delbut.addEventListener('click', function(){
              console.log("oal");
              fetch('http://localhost:3001/remove/'+json[i].id, { method: 'DELETE'})
    .then(() => function(){})
    document.getElementById("data").deleteRow(-1);

            });
           // delbut.onclick = deleteAPI(id);
            row.id = json[i].id;
            idcol.innerHTML = json[i].id;
            nmcol.innerHTML = json[i].name;
            row.appendChild(idcol);
            row.appendChild(nmcol);
            row.appendChild(delbut);
            tab.appendChild(row);
          }
        }())
        document.getElementById("myForm").reset()
}

// function deleteAPI(id){
//   return function(){
//   fetch('http://localhost:3001/remove', { method: 'DELETE' ,  body: JSON.stringify({
//     id: id,
// }),
//        headers: {
//     "Content-type": "application/json; charset=UTF-8"
// }})
//     .then(() => function(){
//       document.getElementById("data").deleteRow(0);
//     });}
    
// }

export default App;

//http://projerepo.s3-website.us-east-2.amazonaws.com


// {
//   "Version": "2012-10-17",
//   "Statement": [{
//     "Sid": "AllowPublicReadAccess",
//     "Effect": "Allow",
//     "Principal":"*",
//     "Action": [
//         "s3:GetObject"
//         ],
//     "Resource": ["arn:aws:s3:::projerepo/*"]
//   }]
//   }