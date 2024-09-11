 /* BUTOON */
 const menu = document.getElementById('menu')
 const navigation = document.getElementById('nav')

 menu.addEventListener('click', ()=>{
     menu.classList.toggle('active')
     navigation.classList.toggle('active')
 })
 
 navigation.addEventListener('click', ()=>{
     menu.classList.remove('active')
     navigation.classList.remove('active')
 });

