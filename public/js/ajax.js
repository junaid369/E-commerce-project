

// function addtocart(proId){
//     $.ajax({
//         url:'/add-to-cart/'+proId,
//         method:'get',
//         success:(response)=>{
//             alert(response)
//         }
//     })
// }


function addtocart(proId) {
    alert("")
        $.ajax({
      // console.log(pro);
      url: "/add-to-cart/" + proId,
      method: 'get',
      success: (response) => {
          if (response.status){
              document.getElementById("cart-count").innerHTML=response.cartcount

        }
       
      }
    })
  }
  function addToCart(proId) {
   
    
    $.ajax({
        
        url: "/add-to-cart/"+proId,
        method: 'get',
        success: (response) => {
            alert("added")
            if (response.status) {
                document.getElementById("cart-count").innerHTML = response.cartcount

            }

        }
    })
}

function addtowishlist(proId) {
   
    
    $.ajax({
        
        url: "/add-to-wishlist/"+proId,
        method: 'get',
        success: (response) => {
            alert("added")
          
        }
    })
}

function deletewish(wish, prodId, proId) {
    alert("")
     $.ajax({
         url: '/delete-wish-item',
         data: {
             wishId: wish,
             proId: prodId
         },

         method: 'post',
         success: (response) => {
             if (response.removeProduct) {
                 console.log("hello ew")
             
                 
         
                 document.getElementById(proId + 'row').hidden = true
                 

             }
             if (response.wishEmpty) {
                 alert("The item has been removed")
                 location.reload()
             }
         }
     })
 }




