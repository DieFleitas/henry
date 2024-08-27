function getFriends() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  let img = document.getElementsByTagName("img");
  if (img.length > 0) {
    img[0].remove();
  }

  $.get("http://localhost:5000/amigos", function (amigos) {
    amigos.forEach((amigo) => {
      let li = document.createElement("li");
      li.textContent = amigo.name;
      $("#lista").append(li);
    });
  });
}

$("#boton").click(getFriends); //get friends

function searchFriend() {
  let id = document.getElementById("input").value;
    $.get(`http://localhost:5000/amigos/${id}`, function (amigo) {
        document.getElementById('amigo').textContent = amigo.name;
    })
    $('#input').val('');
}

$("#search").click(searchFriend); //search friend by id

function deleteFriend() {
    let id = document.getElementById('inputDelete').value;
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:5000/amigos/${id}`,
        success: () => {
            alert('amigo borrado');
            getFriends();
        }
    })
    $('#inputDelete').val('');
}

$('#delete').click(deleteFriend) //delete friend by id