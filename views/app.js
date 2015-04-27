console.log('loading client script');
document.getElementById('bouton').addEventListener('click', function(ev) {
  console.log('clicked');
  var name = document.getElementById('entree').value
  document.getElementById('name').innerHtml = name;
})