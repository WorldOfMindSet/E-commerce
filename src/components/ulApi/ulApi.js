function ulApi() {
  // const ulApi = document.querySelector('#ul__api')
  const ulApi = document.getElementById('ul__api')
  const categorias = [];

  async function productsApi() {
    const url = 'https://ecommercebackend.fundamentos-29.repl.co/'
    const res = await fetch(url)
    console.log(res);
    try {
      document.getElementById("li_img").style.display = "none";
     
      const data = await res.json()
      //console.log(data);

      for (const product of data) {

        const li = document.createElement('li')
        li.classList.add('ul__li')

        li.innerHTML += `

          <img src=${product.image} alt=${product.name} class='ul__img'>
          
          <div class='ul__div'>
            <h2 class='ul__h2'>${product.name}</h2>
            <h3 class='ul__h3'>$${product.price}.00</h3>
          </div>
      `
        ulApi.appendChild(li)

        if(!categorias.includes(product.category)){
          categorias.push(product.category);
      }

        li.addEventListener('click', () => {
          console.log(`Me has pillado con tu clic y doy id: ${product.id}`);
          localStorage.setItem('productModal', `${product.id}`)
          window.location.href = `../../../detail.html?id=${product.id}`
        })
      }

      const select = document.querySelector(".article__select");
      for(const valor of categorias){
          select.innerHTML += `<option value="${valor}">${valor}</option>`;
      }

      select.addEventListener("change", function(event){
        const valor = event.target.value;

        const test = document.getElementsByClassName("ul__li");
        if(valor == "todos"){
        
            ulApi.innerHTML = "";
            let mostrarfiltro = "";
            
            //mostrarfiltro += `<ul class="article__ul ul">`;
            for(const datos of data){
                mostrarfiltro += `
                    <li class="ul__li" onClick="window.location='../../../detail.html?id=${datos.id}'">
                      <img src=${datos.image} alt=${datos.name} class='ul__img'>
          
                      <div class='ul__div'>
                        <h2 class='ul__h2'>${datos.name}</h2>
                        <h3 class='ul__h3'>$${datos.price}.00</h3>
                      </div>
                    </li>
                `;

             
                
            }    
            //mostrarfiltro += `</ul>`; 
            ulApi.innerHTML = mostrarfiltro;
        }else{
           
            //Mostramos los articulos por categoria
            ulApi.innerHTML = "";
            let mostrarfiltro = "";
            
            mostrarfiltro += `<ul class="article__ul ul">`;
            for(const datos of data){
                if(valor == datos.category){

                    mostrarfiltro += `
                    <li class="ul__li" onClick="window.location='../../../detail.html?id=${datos.id}'">
                      <img src=${datos.image} alt=${datos.name} class='ul__img'>
          
                      <div class='ul__div'>
                        <h2 class='ul__h2'>${datos.name}</h2>
                        <h3 class='ul__h3'>$${datos.price}.00</h3>
                      </div>
                   </li>
                    `;
   
                }

       
                
            }    
            mostrarfiltro += `</ul>`; 
            ulApi.innerHTML = mostrarfiltro+`</ul>`;
       }
    });

    } catch (error) {
      console.log(error);
    }

  }

  setTimeout(() => {
    productsApi();
}, 3000);

}

export default ulApi