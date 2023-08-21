function displayProdust(listaProductos){
   let productsHTML ='';
   listaProductos.forEach(element => {
      productsHTML +=
      `<div class="info-producto">
          <h2>${element.Modelo}</h2> 
          <p class="price">${element.Precio}</p>
          <button> <a href="#"> Detalles </a> </button>
          <button class="btn-add-cart"> Añadir al carrito </button>
      </div>`
   });
}
document.getElementById('info-producto').innerHTML = productsHTML;




window.onload = async() =>{
   const listaProductos = await (await fetch("/api/inventario")).json();
   console.log(listaProductos);
   displayProdust(listaProductos);
}