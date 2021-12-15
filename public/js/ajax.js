  
function addtocart(proId) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      

    $.ajax({
        
        url: "/add-to-cart/" + proId,
        method: 'get',
        success: (response) => {
            Toast.fire({
                icon: 'success',
                title: 'item add to cart'
              })
            if (response.status) {
                document.getElementById("cart-count").innerHTML = response.cartcount

            }

        }
    })
}



function addtowishlist(proId) {
  
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
    $.ajax({
        url: '/add-To-wishlist/' + proId,
     
        method: 'get',
        success: (response) => {
          
            if (response.pulled) {
                Toast.fire({
                    icon: 'error',
                    title: 'item removed from Wishlist'
                })

            } else if (response.status) {
                location.replace('/login')
            } else {
                Toast.fire({
                    icon: 'success',
                    title: 'item added to Wishlist'
                })
            }
        }
    })
}




function ChangeQty(cartId, proId, count,userID) {
    console.log(cartId,proId,count,"your datas"); 

    let quantity = parseInt(document.getElementById(proId).innerHTML)
    console.log(quantity)
    count = parseInt(count)


    $.ajax({


        url: '/change-product-quantity',
        data: {
            user:userID,
            cart: cartId,
            product: proId,
            count: count,
            quantity: quantity

        },
        method: 'post',
        success: (response) => {
          
           console.log(response)

            if (response.removeProduct) {
                document.getElementById(proId + "a").disabled = true
                location.reload()
            } else {
              
                document.getElementById(proId + "a").disabled = false
                document.getElementById(proId).innerHTML = quantity + count
                document.getElementById('Total').innerHTML = response.total
                document.getElementById('subTotal' + proId).innerHTML = response.subTotal

            }

        }

    }
    )

}




function deleteProCart(cart, prodId, proId) {
    $.ajax({
        url: '/delete-cart-item',
        data: {
            cartId: cart,
            proId: prodId

        },
        method: 'post',
        success: (response) => {
            if (response.removeProduct) {
                console.log("hello ew")


                location.reload()
                document.getElementById(proId + 'row').hidden = true


            }
            if (response.cartEmpty) {
                alert("The item has been removed")
                location.reload()
            }
        }
    })
}





function deleteProCart(cart, prodId, proId) {


    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: '/delete-cart-item',
                data: {
                    cartId: cart,
                    proId: prodId

                },
                method: 'post',
                success: (response) => {
                    if (response.removeProduct) {
                        console.log("hello ew")


                        location.replace('/cart')
                        document.getElementById(proId + 'row').hidden = true


                    }
                    if (response.cartEmpty) {
                        alert("The item has been removed total")
                        location.reload()
                    }
                }
            })
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })


}











	

//     function addtowishlist(proId) {
   
    
//     $.ajax({
        
//         url: "/add-To-wishlist/"+proId,
//         method: 'get',
//         success: (response) => {
          
          
//         }
//     })
// }



function deletewish(wish, prodId, proId) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
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
             
                 
         
                 document.getElementById(proId).hidden = true
                 

             }
             if (response.wishEmpty) {
                 alert("The item has been removed")
                 location.reload()
             }
         }
     })
     Swal.fire(
        'Deleted!',
        'Your file has been deleted.',
        'success'
    )
 }



 

function deletewishlist(wish, prodId, proId) {


    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
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
                    
                        
                
                        document.getElementById(proId).hidden = true
                        
       
                    }
                    if (response.wishEmpty) {
                        alert("The item has been removed")
                        location.reload()
                    }
                }
            })
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })


}
