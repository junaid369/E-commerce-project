

var express = require('express');
var router = express.Router();
const { Db } = require('mongodb');
var router = express.Router();
var db = require('../config/connection')
var collection = require('../config/collection');
const adminHelper = require('../helpers/admin-helpers');
let fs = require('fs');
const { latestorders } = require('../helpers/admin-helpers');



const verifyAdminLogin = (req, res, next) => {
  if (req.session.adminloggedIn) {
    next()
  } else {
    res.redirect('/admin/login')
  }
}


router.get('/login', (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  if (req.session.adminloggedIn) {
    res.redirect('/admin')
  } else {

    res.render('admin/adminlogin', { login: true, adminvalidation:true,  "loginErr": req.session.loggedInErr });
    req.session.loggedInErr = false
  }
})
router.post('/login', (req, res,) => {
  adminHelper.doAdminLogin(req.body).then((responseAdmin) => {
    if (responseAdmin.status) {
      req.session.admin = responseAdmin.admin
      req.session.adminloggedIn = true
      res.redirect('/admin')
    } else {
      req.session.loggedInErr = true
      res.redirect('/admin/login')
    }
  })
})


router.get('/', async function(req, res, next) {
  let admin = req.session.admin
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  if (req.session.adminloggedIn) {
    let latestproduct=await adminHelper.latestProduct()
    let latestorders=await adminHelper.latestorders()
    let userCount= await adminHelper.getUserCount()
    let productCount=await adminHelper.getProductCount()
    // let Profite=await adminHelper.getProfite()
   let AllMethods=await adminHelper.AllMethods()
   let Status=await adminHelper.OrderStatus()
   let Topproducts=await adminHelper.topSellingProducts() 
   console.log(Status,"ball");
    
    console.log(latestproduct,"night work");
   console.log(latestorders,"night orders");
   console.log(latestorders.Total);
   console.log(Topproducts,"top products");
   
console.log(Topproducts.brand);
    res.render('admin/dashboard', { admin: true,latestproduct,latestorders,userCount,productCount,AllMethods,Status,Topproducts })
  }
  else {
    res.redirect('/admin/login')
  }
});

router.get('/allusers',async function (req, res, next) {
  console.log("hy wel");
  let userlist=await adminHelper.getAllUser()
  console.log("welcome user");
  console.log(userlist);
  res.render('admin/allusers', { admin: true,userlist });
});




router.get('/Activeusers',async function (req, res, next) {
  console.log("hy wel");
  let active=await adminHelper.getActiveUsers()
  console.log("welcome user");
  console.log(active);
  res.render('admin/activeusers', { admin: true,active });
});




// router.get('/Blockedusers',async function (req, res, next) {
//   console.log("hy wel");
//   let block=await adminHelper.blockUser()
//   console.log("welcome juaid user");
//   console.log(block);
//   res.render('admin/blockedusers', { admin: true,block });
//   console.log("hy sk");
// });

router.get('/Blockedusers', verifyAdminLogin,async (req, res) => {
  console.log("j222222222222222222222");
  // let block=await adminHelper.getBlockedUsers()
  adminHelper.getBlockedUsers().then((blockedUsers) => {
    console.log(blockedUsers,"5765555555555555555");

    res.render('admin/blockedusers', { admin: true, blockedUsers })

  })

})

// router.get('/blocked-users', verifyAdminLogin, (req, res) => {
//   adminHelpers.getBlockedUsers().then((blockedUsers) => {

//     res.render('admin/blocked-users', { admin: true, blockedUsers })
//   })

// })

router.get('/block-user/:id',  (req, res) => {
  let id = req.params.id
  adminHelper.blockUser(id).then((response) => {
    res.redirect('/admin/allusers')
  })

})

router.get('/unblock-user/:id',  (req, res) => {
  console.log("welcome nihal");
  let id = req.params.id
  adminHelper.unblockUser(id).then((response) => {
    res.redirect('/admin/allusers')
  })

})
















router.get('/blockedusers',async function (req, res, next) {
  console.log("hy wel");
  let blockedlist=await adminHelper.getBlockedUsers()
  console.log("welcome user");
  console.log(blockedlist);
  res.render('admin/blockedusers', { admin: true,blockedlist });
});









router.get('/addproduct', verifyAdminLogin, async function (req, res, next) {
  let brand = await adminHelper.getAllbrands()
  let cat = await adminHelper.getAllcategory()
  console.log("hu imam unaiis");
  res.render('admin/addproduct', { admin: true, brand, cat,sample:true })
  console.log("hy", cat);
});

router.post('/addproduct', verifyAdminLogin, function (req, res) {
  console.log(req.body);
  console.log(req.files.image);
  let image1 = req.files.image
  let image2 = req.files.image2
  let image3 = req.files.image3

  adminHelper.addproduct(req.body).then((id) => {
 
    image1.mv('public/product-images/' + id + '.a.jpg')
    image2.mv('public/product-images/' + id + '.b.jpg')
    image3.mv('public/product-images/' + id + '.c.jpg')

    res.redirect('/admin/productview')


  }).catch((err)=>{
    console.log(err);
    if(err.code==11000){
      req.session.proExist=true
      res.redirect('/admin/addproduct')
    }
  })

});

router.get('/viewbrands', async function (req, res, next) {
  adminHelper.getAllbrands().then(async (brands) => {
    let brand = await adminHelper.getAllbrands()

    console.log(brand);

    res.render('admin/viewbrands', { admin: true, brand });
  })

})

router.get('/addnewbrands', verifyAdminLogin, function (req, res, next) {
  res.render('admin/addnewbrands', { admin: true ,sample:true});
});
router.post('/addnewbrands', verifyAdminLogin, function (req, res, next) {
  console.log(req.body, "hy");
  console.log(req.files.image);
  adminHelper.addbrands(req.body).then((id) => {
    let image = req.files.image
    image.mv('public/brand-images/' + id + '.jpg', (err, done) => {

      if (!err) {
        res.redirect('/admin/viewbrands')
      }
      else {
        console.log("jhgf")
        res.redirect('/admin/addnewbrands')
      }
    })
  })
});

router.get('/brand-delete/:id', verifyAdminLogin, (req, res) => {
  let proID = req.params.id
  adminHelper.deletebrands(proID).then((response) => {
    res.redirect('/admin/viewbrands')
  })
})
router.get('/brand-edit/:id', verifyAdminLogin, async (req, res) => {

   let brandID = req.params.id
 console.log("hy brands  thanks for visit");
  let  brand= await adminHelper.getbrandDetails(brandID)
  res.render('admin/brandedit', { admin: true,brand,sample:true})
})

router.post('/edit-brand/:id', verifyAdminLogin, (req, res) => {
  adminHelper.updatebrand(req.params.id, req.body)
  let id = req.params.id
  console.log(req.body);
  res.redirect('/admin/viewbrands')
    let image = req.files.image
    image.mv('public/brand-images/' + id + '.jpg')
  
  
  
})

router.get('/productview', function (req, res, next) {
  adminHelper.getAllproducts().then((products) => {
    res.render('admin/productview', { admin: true, products });
  })

});

router.get('/viewcategory', function (req, res, next) {
  adminHelper.getAllcategory().then((cat) => {
    res.render('admin/viewcategory', { admin: true, cat });
  })

})
router.get('/addcategory', verifyAdminLogin, function (req, res, next) {
  res.render('admin/addcategory', { admin: true ,sample:true});
});

router.post('/addcategory', function (req, res, next) {

  adminHelper.addcategory(req.body).then((response) => {
     console.log(req.body);
  })

  res.redirect('/admin/viewcategory')
});







router.get('/category-edit/:id', verifyAdminLogin, async (req, res) => {
  let catID = req.params.id
console.log("hy brands  thanks for visit");
 let  catgy= await adminHelper.getcatDetails(catID)
 console.log("hy i a m junaid welcome my world");
 console.log(catgy);
 res.render('admin/editcategory', { admin: true,catgy,sample:true})
})

router.post('/edit-category/:id', verifyAdminLogin, (req, res) => {
  adminHelper.updatecat(req.params.id, req.body)
  let id = req.params.id
  console.log(req.body);
  res.redirect('/admin/viewcategory')
})

router.get('/category-delete/:id', verifyAdminLogin, (req, res) => {
  let catID = req.params.id
  adminHelper.deletecategory(catID).then((response) => {
    res.redirect('/admin/viewcategory')
  })
})

router.get('/product-delete/:id', verifyAdminLogin, (req, res) => {
  let proID = req.params.id
  adminHelper.deleteproducts(proID).then((response) => {
    fs.unlinkSync('public/product-images/' + proID + '.a.jpg')
    fs.unlinkSync('public/product-images/' + proID + '.b.jpg')
    fs.unlinkSync('public/product-images/' + proID + '.c.jpg')




    res.redirect('/admin/productview')
  })
})
router.get('/editproduct/:id', verifyAdminLogin, async (req, res) => {
  let prdtID = req.params.id
  let product = await adminHelper.getproductDetails(prdtID)
  let brand = await adminHelper.getAllbrands()
  let cat = await adminHelper.getAllcategory()

  res.render('admin/editproduct', { admin: true, product, brand, cat })
})
router.post('/edit-product/:id', verifyAdminLogin, (req, res) => {
  adminHelper.updateproduct(req.params.id, req.body)
  let id = req.params.id
  console.log(req.body);
  res.redirect('/admin/productview')
  if (req.files.image1) {
    let image1 = req.files.image1
    image1.mv('public/product-images/' + id + '.a.jpg')
  }
  if (req.files.image2) {
    let image2 = req.files.image2
    image2.mv('public/product-images/' + id + '.b.jpg')
  }
  if (req.files.image3) {
    let image3 = req.files.image3

    image3.mv('public/product-images/' + id + '.c.jpg')
  }
})


//  bannermangament

router.get('/banner-management',async (req,res)=>{
  banner=await adminHelper.getallbanner()
 
  res.render('admin/viewbanner',{admin:true,banner})
})

router.get('/add-banner',(req,res)=>{
  
  res.render('admin/add-banner',{admin:true})

})
router.post('/add-banner',(req,res)=>{
  adminHelper.addbanner(req.body).then((id)=>{
    console.log(req.files);
    let image=req.files.image8
    image.mv('public/banner-images/' + id + '.jpg', (err, done) => {
      if (!err) {
        res.redirect('/admin//banner-management')
      }
      else {
     
        res.redirect('/admin/addbanner')
      }
    })
  })
  
})

router.get('/banner-edit/:id', verifyAdminLogin, async (req, res) => {

  let bannerID = req.params.id
console.log("hy brands  thanks for visit");
 let  banner= await adminHelper.getbannerDetails(bannerID)
 console.log(banner,"kms");
 res.render('admin/banner-edit', { admin: true,banner})
})

router.post('/edit-banner/:id', verifyAdminLogin, (req, res) => {
  console.log("13378");
 adminHelper.updatebanner(req.params.id, req.body).then(()=>{
  let id = req.params.id
  console.log(req.body,"hy junaid");
  res.redirect('/admin/banner-management')
  let image = req.files.image8
  image.mv('public/banner-images/' + id + '.jpg')

 

 })
 
  //  res.redirect('/admin/viewbanner')
 
 
 
})
router.get('/banner-delete/:id', verifyAdminLogin, (req, res) => {
  let bannerID = req.params.id
  adminHelper.deletebanner(bannerID).then((response) => {
    res.redirect('/admin/banner-management')
  })
})










router.get('/logout', (req, res) => {
  req.session.admin = null
  req.session.adminloggedIn = false
  res.redirect('/admin/login')
})

router.get('/orders', async (req, res) => {
  console.log("8888888");
  let ordersList = await adminHelper.getAllOrders()
  console.log(ordersList);
  res.render('admin/all-orders', { admin: true, ordersList })
})

router.get('/singleOrder/:id', (req, res) => {
  let oId = req.params.id
  adminHelper.getOrderProducts(oId).then((products) => {
    console.log(products);
    res.render('admin/single-order', { products, admin: true })
  })
})


router.get('/shipped/:id', (req, res) => {
  Status= 'Shipped'
  adminHelper.changeOrderStatus(req.params.id, Status).then(() => {
    res.redirect('/admin/orders')
  })
})
router.get('/delivered/:id', (req, res) => {
  Status = 'Delivered'
  adminHelper.changeOrderStatus(req.params.id, Status).then(() => {
    res.redirect('/admin/orders')
  })
})
router.get('/cancelled/:id', (req, res) => {
  Status= 'Cancelled'
  adminHelper.changeOrderStatus(req.params.id,  Status).then(() => {
    res.redirect('/admin/orders')
  })
})
router.get('/placed/:id', (req, res) => {
  Status= 'placed'
  adminHelper.changeOrderStatus(req.params.id,  Status).then(() => {
    res.redirect('/admin/orders')
  })
})



module.exports = router;

