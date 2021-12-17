





    
$(document).ready(function(){
    $("#buyaddress").validate({
    rules:{
        FirstName:{
           
            required:true
            
        },
        LastName:{
            required:true
          
        },
        House:{
            required:true

        },
        Street:{
            required:true

        },
        Town:{
            required:true

        },
        PIN:{
            required:true

        },
    },
})
})

   





$(document).ready(function(){
    $("#submitForm").validate({
    rules:{
        firstname:{
            minlength:3,
            required:true
            
        },
      lastname:{
            required:true,
            minlength:3
        },
        email:{
            required:true,
            email:true
        },
        mobile:{
            required:true,
            minlength:10,
            maxlength:10
        },
        password:{
            required:true,
            maxlength:6,
            minlength:6
        }

    }
})

})


$(document).ready(function(){
    $("#userLoginvalidation").validate({
    rules:{
        mobile:{
            maxlength:10,
            required:true  
        },
      password:{
            required:true,
            minlength:6,
            maxlength:6
        },
    }
})
})



$(document).ready(function(){
    $("#adminlogin").validate({
    rules:{
        email:{
            email:true,
            required:true
            
        },
      password:{
            required:true,
            minlength:3
        },
       
      
    }
})

})
$(document).ready(function(){
    $("#mobile").validate({
    rules:{
      
      mobileNo:{
            required:true,
        
        },
       
      
    }
})

})


// $(document).ready(function(){
//     $("#loginotp").validate({
//     rules:{
      
//       otp:{
//             required:true,
        
//         },
       
      
//     }
// })

// })

// $(document).ready(function(){
//     $("#signupotp").validate({
//     rules:{
      
//       otp:{
//             required:true,
        
//         },
       
      
//     }
// })

// })





$(document).ready(function () {
    $("#mobile").validate({
      rules: {
        mobileNo: {

          required: true,
          minlength:10
        },
      

      }
    })

  })





$(document).ready(function(){
    $("#category").validate({
    rules:{
        cname:{
            
            required:true
            
        },
      sname:{
            required:true,
            
        },
       
      
    }
})

})
$(document).ready(function(){
    $("#new").validate({
    rules:{
        name:{
            
            required:true
            
        },
      cat:{
            required:true,
            
        },
        brand:{
            
            required:true
            
        },
      PPrice:{
            required:true,
            
        },
        pid:{
            
            required:true
            
        },
      size:{
            required:true,
            
        },
        pstock:{
            required:true,
            
        },
        lcost:{
            
            required:true
            
        },
      image:{
            required:true,
            
        },
        image2:{
            
            required:true
            
        },
      image3:{
            required:true,
            
        },
       
      
    },
})
$(document).ready(function(){
    $("#new").validate({
    rules:{
        name:{
            
            required:true
            
        },
      cat:{
            required:true,
            
        },
        brand:{
            
            required:true
            
        },
      PPrice:{
            required:true,
            
        },
        pid:{
            
            required:true
            
        },
      size:{
            required:true,
            
        },
        pstock:{
            required:true,
            
        },
        lcost:{
            
            required:true
            
        },
      image:{
            required:true,
            
        },
        image2:{
            
            required:true
            
        },
      image3:{
            required:true,
            
        },
       
      
    },
    submitHandler: function submitForm(form) {
        console.log(form)
        swal.fire({
            title: "Are you sure?",
            text: "This form will be submitted",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOkay) => {
            if (isOkay) {
                console.log("isokay")
                form.submit();
            }
        });
        return false;
    }

})
})

$(document).ready(function(){
    $("#sample").validate({
    rules:{
        cname:{
            
            required:true
            
        },
      sname:{
            required:true,
            
        },
       
      
    },
    submitHandler: function submitForm(form) {
        console.log(form)
        swal.fire({
            title: "Are you sure?",
            text: "This form will be submitted",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOkay) => {
            if (isOkay) {
                console.log("isokay")
                form.submit();
            }
        });
        return false;
    }
})

})




$(document).ready(function(){
    $("#brand").validate({
    rules:{
        brand:{
           
            required:true
            
        },
        description:{
            required:true
          
        },
        image:{
            required:true

        },
       
      
    },
    submitHandler: function submitForm(form) {
        console.log(form)
        swal.fire({
            title: "Are you sure?",
            text: "This form will be submitted",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOkay) => {
            if (isOkay) {
                console.log("isokay")
                form.submit();
            }
        });
        return false;
    }

})

})

})


$(document).ready(function(){
    $("#editprofile").validate({
    rules:{
        name:{
           
            required:true
            
        },
        lastname:{
            required:true
          
        },
        email:{
            required:true

        },
        number:{
            required:true

        },
    },
      
    

    submitHandler: function submitForm(form) {
        console.log(form)
        swal.fire({
            title: "Are you sure?",
            text: "This form will be submitted",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOkay) => {
            if (isOkay) {
                console.log("isokay")
                form.submit();
            }
        });
        return false;
    }

})

})



// profile address


$(document).ready(function(){
    $("#profileaddress").validate({
    rules:{
        FirstName:{
           
            required:true
            
        },
        LastName:{
            required:true
          
        },
        House:{
            required:true

        },
        Street:{
            required:true

        },
        Town:{
            required:true

        },
        PIN:{
            required:true

        },
    },
      
    

    submitHandler: function submitForm(form) {
        console.log(form)
        swal.fire({
            title: "Are you sure?",
            text: "This form will be submitted",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOkay) => {
            if (isOkay) {
                console.log("isokay")
                form.submit();
            }
        });
        return false;
    }

})

})




$(document).ready(function(){
    $("#editaddress").validate({
    rules:{
        FirstName:{
           
            required:true
            
        },
        LastName:{
            required:true
          
        },
        House:{
            required:true

        },
        Street:{
            required:true

        },
        Town:{
            required:true

        },
        PIN:{
            required:true

        },
    },
      
    

    submitHandler: function submitForm(form) {
        console.log(form)
        swal.fire({
            title: "Are you sure?",
            text: "This form will be submitted",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOkay) => {
            if (isOkay) {
                console.log("isokay")
                form.submit();
            }
            
        });
        return false;
    }
    

})

})



    

$(document).ready(function(){
    $("#password").validate({
    rules:{
        current:{
           
            required:true
            
        },
        password1:{
            required:true,
            minlength:6,
            maxlength:6
          
        },
        password2:{
            required:true,
            minlength:6,
            maxlength:6

        },

    },
    
    submitHandler: function submitForm(form) {
        console.log(form)
        swal.fire({
            title: "Are you sure?",
            text: "This form will be submitted",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOkay) => {
            if (isOkay) {
                console.log("isokay")
                form.submit();
            }
            window.location = link;
            
        });
        return false;
    }
    
})

})






$(document).ready(function(){
    $("#editaddress").validate({
    rules:{
        FirstName:{
           
            required:true
            
        },
        LastName:{
            required:true
          
        },
        House:{
            required:true

        },
        Street:{
            required:true

        },
        Town:{
            required:true

        },
        PIN:{
            required:true

        },
    },
      
    

    submitHandler: function submitForm(form) {
        console.log(form)
        swal.fire({
            title: "Are you sure?",
            text: "This form will be submitted",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOkay) => {
            if (isOkay) {
                console.log("isokay")
                form.submit();
            }
            
        });
        return false;
    }
    

})

})








$(document).ready(function(){
    $("#banner2").validate({
    rules:{
        name:{
           
            required:true
            
        },
        description:{
            required:true

        },
      
        title1:{
           
            required:true
            
        },
        title2:{
            required:true
          
        },
        title3:{
            required:true

        },
        link:{
            required:true

        },
        imge8:{
            required:true

        },
    },
        submitHandler: function submitForm(form) {
            console.log(form)
            swal.fire({
                title: "Are you sure?",
                text: "This form will be submitted",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((isOkay) => {
                if (isOkay) {
                    console.log("isokay")
                    form.submit();
                }

                
            });
            return false;
        }
        
    
    })
    
    })



    $(document).ready(function(){
        $("#productPage").validate({
        rules:{
            choose:{
                
                required:true
                
            },
            Starting:{
                required:true,
                
            },
            Expiry:{
                
                required:true
                
            },
            Offer:{
                required:true,
                
            },
           
          
        }
    })
    
    })


    $(document).ready(function(){
        $("#setpassword").validate({
        rules:{
   
            password1:{
                required:true,
                minlength:6,
                maxlength:6
              
            },
            password2:{
                required:true,
                minlength:6,
                maxlength:6
    
            },
    
        }
    })
    })







// Swal.fire({
//     title: 'Are you sure?',
//     text: "You won't be able to revert this!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire(
//         'Deleted!',
//         'Your file has been deleted.',
//         'success'
//       )
//     }
//   })

// function fileValidation1() {
//     const imagebox = document.getElementById('image-box')
//     const crop_btn = document.getElementById('crop-btn')
//     var fileInput = document.getElementById('file1');

//     var filePath = fileInput.value;
//     var allowedExtensions = /(\.jpg)$/i;
//     if (!allowedExtensions.exec(filePath)) {
//         alert('Please upload file having extensions .jpeg only.');
//         fileInput.value = '';
//         return false;
//     } else {
//         //Image preview
//         const img_data = fileInput.files[0]
//         const url = URL.createObjectURL(img_data)
//         imagebox.innerHTML = `<img src="${url}" id="image" style="width:100%">`
//         const image = document.getElementById('image')
//         document.getElementById('image-box').style.display = 'block'
//         document.getElementById('crop-btn').style.display = 'block'
//         document.getElementById('confirm-btn').style.display = 'none'

//         const cropper = new Cropper(image, {
//             autoCropArea: 1,
//             viewMode: 1,
//             scalable: false,
//             zoomable: false,
//             movable: false,
//             aspectRatio: 16 / 19,
//             //  preview: '.preview',
//             minCropBoxWidth: 180,
//             minCropBoxHeight: 240,
//         })
//         crop_btn.addEventListener('click', () => {
//             cropper.getCroppedCanvas().toBlob((blob) => {
//                 let fileInputElement = document.getElementById('file1');
//                 let file = new File([blob], img_data.name, { type: "image/*", lastModified: new Date().getTime() });
//                 let container = new DataTransfer();

//                 container.items.add(file);
//                 const img = container.files[0]
//                 var url = URL.createObjectURL(img)
//                 fileInputElement.files = container.files;
//                 document.getElementById('imgview1').src = url
//                 document.getElementById('image-box').style.display = 'none'
//                 document.getElementById('crop-btn').style.display = 'none'
//                 document.getElementById('confirm-btn').style.display = 'block'
//             });
//         });
//     }
// }

// })

// function fileValidation2() {
//     const imagebox = document.getElementById('image-box2')
//     const crop_btn = document.getElementById('crop-btn2')
//     var fileInput = document.getElementById('file2');

//     var filePath = fileInput.value;
//     var allowedExtensions = /(\.jpg)$/i;
//     if (!allowedExtensions.exec(filePath)) {
//         alert('Please upload file having extensions .jpeg only.');
//         fileInput.value = '';
//         return false;
//     } else {
//         //Image preview
//         const img_data = fileInput.files[0]
//         const url = URL.createObjectURL(img_data)
//         imagebox.innerHTML = `<img src="${url}" id="image" style="width:100%">`
//         const image = document.getElementById('image')
//         document.getElementById('image-box2').style.display = 'block'
//         document.getElementById('crop-btn2').style.display = 'block'
//         document.getElementById('confirm-btn4').style.display = 'none'

//         const cropper = new Cropper(image, {
//             autoCropArea: 1,
//             viewMode: 1,
//             scalable: false,
//             zoomable: false,
//             movable: false,
//             aspectRatio: 16 / 19,
//             //  preview: '.preview',
//             minCropBoxWidth: 180,
//             minCropBoxHeight: 240,
//         })
//         crop_btn.addEventListener('click', () => {
//             cropper.getCroppedCanvas().toBlob((blob) => {
//                 let fileInputElement = document.getElementById('file2');
//                 let file = new File([blob], img_data.name, { type: "image/*", lastModified: new Date().getTime() });
//                 let container = new DataTransfer();

//                 container.items.add(file);
//                 const img = container.files[0]
//                 var url = URL.createObjectURL(img)
//                 fileInputElement.files = container.files;
//                 document.getElementById('imgview2').src = url
//                 document.getElementById('image-box2').style.display = 'none'
//                 document.getElementById('crop-btn2').style.display = 'none'
//                 document.getElementById('confirm-btn4').style.display = 'block'
//             });
//         });
//     }
// }




// function fileValidation3() {
//     const imagebox = document.getElementById('image-box3')
//     const crop_btn = document.getElementById('crop-btn3')
//     var fileInput = document.getElementById('file3');

//     var filePath = fileInput.value;
//     var allowedExtensions = /(\.jpg)$/i;
//     if (!allowedExtensions.exec(filePath)) {
//         alert('Please upload file having extensions .jpeg only.');
//         fileInput.value = '';
//         return false;
//     } else {
//         //Image preview
//         const img_data = fileInput.files[0]
//         const url = URL.createObjectURL(img_data)
//         imagebox.innerHTML = `<img src="${url}" id="image3" style="width:100%">`
//         const image = document.getElementById('image3')
//         document.getElementById('image-box3').style.display = 'block'
//         document.getElementById('crop-btn3').style.display = 'block'
//         document.getElementById('confirm-btn4').style.display = 'none'

//         const cropper = new Cropper(image, {
//             autoCropArea: 1,
//             viewMode: 1,
//             scalable: false,
//             zoomable: false,
//             movable: false,
//             aspectRatio: 16 / 19,
//             //  preview: '.preview',
//             minCropBoxWidth: 180,
//             minCropBoxHeight: 240,
//         })
//         crop_btn.addEventListener('click', () => {
//             cropper.getCroppedCanvas().toBlob((blob) => {
//                 let fileInputElement = document.getElementById('file3');
//                 let file = new File([blob], img_data.name, { type: "image/*", lastModified: new Date().getTime() });
//                 let container = new DataTransfer();

//                 container.items.add(file);
//                 const img = container.files[0]
//                 var url = URL.createObjectURL(img)
//                 fileInputElement.files = container.files;
//                 document.getElementById('imgview3').src = url
//                 document.getElementById('image-box3').style.display = 'none'
//                 document.getElementById('crop-btn3').style.display = 'none'
//                 document.getElementById('confirm-btn4').style.display = 'block'
//             });
//         });
//     }
// }



// function fileValidation4() {
//     const imagebox = document.getElementById('image-box4')
//     const crop_btn = document.getElementById('crop-btn4')
//     var fileInput = document.getElementById('file4');

//     var filePath = fileInput.value;
//     var allowedExtensions = /(\.jpg)$/i;
//     if (!allowedExtensions.exec(filePath)) {
//         alert('Please upload file having extensions .jpeg only.');
//         fileInput.value = '';
//         return false;
//     } else {
//         //Image preview
//         const img_data = fileInput.files[0]
//         const url = URL.createObjectURL(img_data)
//         imagebox.innerHTML = `<img src="${url}" id="image4" style="width:100%">`
//         const image = document.getElementById('image4')
//         document.getElementById('image-box4').style.display = 'block'
//         document.getElementById('crop-btn4').style.display = 'block'
//         document.getElementById('confirm-btn4').style.display = 'none'

//         const cropper = new Cropper(image, {
//             autoCropArea: 1,
//             viewMode: 1,
//             scalable: false,
//             zoomable: false,
//             movable: false,
//             aspectRatio: 16 / 19,
//             //  preview: '.preview',
//             minCropBoxWidth: 180,
//             minCropBoxHeight: 240,
//         })
//         crop_btn.addEventListener('click', () => {
//             cropper.getCroppedCanvas().toBlob((blob) => {
//                 let fileInputElement = document.getElementById('file4');
//                 let file = new File([blob], img_data.name, { type: "image/*", lastModified: new Date().getTime() });
//                 let container = new DataTransfer();

//                 container.items.add(file);
//                 const img = container.files[0]
//                 var url = URL.createObjectURL(img)
//                 fileInputElement.files = container.files;
//                 document.getElementById('imgview4').src = url
//                 document.getElementById('image-box4').style.display = 'none'
//                 document.getElementById('crop-btn4').style.display = 'none'
//                 document.getElementById('confirm-btn4').style.display = 'block'
//             });
//         });
//     }
// }





// })



