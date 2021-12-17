

var express = require('express');
var router = express.Router();
const { Db, ObjectId } = require('mongodb');
const userHelper = require('../helpers/user-helpers');
var router = express.Router();
var db = require('../config/connection')
var collection = require('../config/collection')
const adminHelper = require('../helpers/admin-helpers');
const { urlencoded } = require('body-parser');
const { response } = require('../app');

const serviceSID = process.env.serviceSID
const accountSID = process.env.accountSID
const authTOCKEN = process.env.authTOCKEN


const client = require('twilio')(accountSID, authTOCKEN)

const paypal = require('paypal-rest-sdk');
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': process.env.client_id,
  'client_secret': process.env.client_secret
});



const verifyUserLogin = (req, res, next) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  if (req.session.userloggedIn) {

    next()
  } else {
    res.redirect('/login')
  }
}


//HOME

router.get('/', async function (req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  let user = req.session.user
  console.log("hy i am in home");

  let cartcount = null

  if (req.session.user) {
    console.log(req.session.user, "user in session");
    let cartcount = await userHelper.getcartcount(req.session.user._id)
    console.log(cartcount, "cartcount");
    console.log("cart");
    let wishcount = await userHelper.getwishcount(req.session.user._id)
    console.log("wishcount get");
    let banner = await adminHelper.getallbanner()
    let products = await adminHelper.getAllproducts()
    console.log("7568678");
    adminHelper.getallbanner().then((banner) => {
      res.render('user/index', { userss: true, user, products, cartcount, wishcount, banner });
    })
  } else {
    adminHelper.getAllproducts().then((products) => {
      adminHelper.getallbanner().then((banner) => {
        console.log(banner, "123");
        res.render('user/index', { userss: true, user: null, products, cartcount, banner });
        console.log("mubashir vanno");

      })
    })
  }
})




//STORE

router.get('/women', async (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  let products = await adminHelper.getAllproducts()
  userHelper.getcartcount(req.session.user._id).then((cartcount) => {
    res.render('user/women', { "user": req.session.user, userss: true, products, cartcount })
  })
})



router.get('/cart', verifyUserLogin, async (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  let cartcount = null
 let total = await userHelper.getTotalAmount(req.session.user._id)
let products = await userHelper.getcartproducts(req.session.user._id)
 console.log(products);
 cartcount = await userHelper.getcartcount(req.session.user._id)
  if (cartcount <= 0) {
  res.render('user/clearcart', { cart: true, userss: true, user: req.session.user })
  }
  else {
    res.render('user/cart', { products, cart: true, user: req.session.user, userss: true, total, sample: true, cartcount })
  }
})
router.get('/add-to-cart/:id', async (req, res) => {
  console.log("api call");
  await userHelper.addTocart(req.params.id, req.session.user._id).then(() => {
    userHelper.getcartcount(req.session.user._id).then((cartcount) => {
      console.log(cartcount);
      console.log(response, "<<<");
      res.json({ status: true, cartcount })
    })
  })
})

router.post('/delete-cart-item', (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  let cartId = req.body.cart

  let proId = req.body.products
  console.log('sdfsgfhjsdgfhsdgf');
  userHelper.deleteCartProduct(req.body).then((response) => {

    console.log('dkjhfsdgfjgsdjfgdshfgsdhfg');
    console.log(response);
    res.json(response)
  })
})




//WISHLIST


router.get('/wishlist', verifyUserLogin, async (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  let wishCount = null
  console.log("hy i ma ajo");

  let wishlist = await userHelper.getwishitems(req.session.user._id)
  console.log(wishlist, "your wishlist");
  let wishcount = await userHelper.getwishcount(req.session.user._id)
  console.log(wishcount, "countnnnnnnnnnn");
  if (wishcount == 0) {
    res.render('user/clear-wishlist', { userss: true, user: req.session.user })
  }
  else {
    res.render('user/user-wishlist', { user: req.session.user, userss: true, wishlist, sample: true })
  }

})


router.get('/add-To-wishlist/:id', async (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

  let pId = await req.params.id
  if (req.session.userloggedIn) {
    let user = await req.session.user._id
    console.log("in wishist count");
    userHelper.addToWishlist(pId, user).then((response) => {
      console.log("out of function");
      if (response.pulled) {
        res.json({ pulled: true })
      } else {
        res.json(response)
      }
    })
  } else {
    console.log("no user");
    res.json({ status: true })
  }
})


router.post('/delete-wish-item', (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  let wishtId = req.body.wishlist
  let wishId = req.body.products
  userHelper.deletewishProduct(req.body).then((response) => {
    console.log(response, "wishitem");

    console.log(response);
    res.json(response)
  })
})



router.get('/wishadd-to-cart/:id', async (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  console.log("api call");
  await userHelper.addTocart(req.params.id, req.session.user._id).then(() => {
    res.json({ status: true })
  })
})




//CHNAGE PRODUCT QUANTITY

router.post('/change-product-quantity', async (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  console.log("hy there");
  let id = req.body.user
  ide = req.session.user._id

  let proId = req.body.product

  userHelper.changeProductCount(req.body).then(async (response) => {
    console.log(response);

    let total = await userHelper.getTotalAmount(ide)
    console.log("**********");
    response.subTotal = await userHelper.getSubTotal(ide, proId)
    console.log(response.subTotal, "sub total");
    response.total = total
    console.log(total, ")))))))))))");

    console.log("hy i am in qua nty page");
    console.log(response.removeProduct, "87689");
    console.log(req.body);
    res.json(response)
  })
})




//PLACE ORDER

router.get('/place-order', verifyUserLogin, async (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

  let user = req.session.user
  let userId = req.session.user._id
  let total = 0
  if (req.session.couponTotal) {
    total = req.session.couponTotal
  }
  else {
    total = await userHelper.getTotalAmount(userId)
  }

  let products = await userHelper.getcartproducts(userId)
  console.log(products, "cart ");
  console.log('dfdfjhgdfhgfdg');

  let cartCount = null
  if (user) {
    let Id = req.session.user._id
    cartCount = await userHelper.getcartcount(Id)

  }

  var address = null
  let status = await userHelper.addressChecker(req.session.user._id)

  if (status.address) {
    console.log(status.address, "st a");
    let addr = await userHelper.getUserAddress(req.session.user._id)

    let len = addr.length
    address = addr.slice(len - 2, len)
  }


  if (cartCount > 0) {
    res.render('user/place-order', { total, userss: true, cartCount, products, address, user, sample: true })
  } else {
    req.session.noCartPro = true
    res.redirect('/cart')
  }

})


router.post('/place-order', async (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  console.log("in place order");
  let id = req.session.user._id
  let products = await userHelper.getCartProductList(id)
  let total = 0
  if (req.session.couponTotal) {
    console.log("coupon applied");
    req.session.total = req.session.couponTotal
    total = req.session.total
  } else {
    total = await userHelper.getTotalAmount(id)
    req.session.total = total
  }

  console.log(req.session.total, 'session');
  userHelper.placeOrder(req.body, products, total).then((orderId) => {
    req.session.orderId = orderId
    if (req.body['payment'] == 'COD') {
      res.json({ codSuccess: true })

    } else if (req.body['payment'] == 'Razorpay') {
      console.log("razorpay", req.session.total);
      userHelper.generateRazorpay(orderId, total).then((resp) => {
        res.json({ resp, razorpay: true })
      })
    } else {
      val = total / 74
      total = val.toFixed(2)
      req.session.total = total
      console.log(total);
      var create_payment_json = {
        "intent": "sale",
        "payer": {
          "payment_method": "paypal"
        },
        "redirect_urls": {
          "return_url": "http://localhost:3000/success",
          "cancel_url": "http://localhost:3000/cancelled"
        },
        "transactions": [{
          "item_list": {
            "items": [{
              "name": "E-BUY",
              "sku": "007",
              "price": total,
              "currency": "USD",
              "quantity": 1
            }]
          },
          "amount": {
            "currency": "USD",
            "total": total
          },
          "description": "PAY LESS WEAR MORE"
        }]
      };

      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
          throw error;
        } else {
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === 'approval_url') {
              url = payment.links[i].href
              console.log(url);
              res.json({ url })
            }
          }
        }
      });
    }
  })
})





//ORDER CANCEL

router.get('/cancelled', (req, res) => {

  res.render('user/user-ordercanceld',{userss:true,user:req.session.user})
})




//ORDER SUUCESS

router.get('/success', (req, res) => {
  console.log("akkusuttuuuu");
  let val = req.session.total
  console.log(req.query);
  const paymentId = req.query.paymentId
  const payerId = req.query.PayerID

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": val
      }
    }]
  }
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      let id = req.session.user
      console.log(id, "ypur paypal id");
      userHelper.changePaymentStatus(req.session.orderId).then(() => {
        userHelper.clearCart(id).then(() => {
          console.log("cart cleared");
        })

        console.log(response);
        res.redirect('/order-success')
      })
    }
  })

})





//BUY NOW

router.get('/buyNow/:id', verifyUserLogin, async (req, res) => {
  let pId = req.params.id
  console.log(pId, "buy id");
  req.session.proId = pId
  let user = req.session.user
  let productDetails = await userHelper.buyproductdetails(pId)
  console.log(productDetails, "OOOOOO");
  let total = await userHelper.getBuyNowTotal(pId)

  req.session.pId = pId

  let cartCount = null
  if (req.session.user) {
    let Id = req.session.user._id
    cartCount = await userHelper.getCartCount(Id)
  }
  //get Address
  var address = null
  let status = await userHelper.addressChecker(req.session.user._id)
  if (status.address) {
    let addr = await userHelper.getUserAddress(req.session.user._id)
    let len = addr.length
    address = addr.slice(len - 2, len)
  }
  res.render('user/buy-now', { total, cart: true, pId, cartCount, productDetails, address, user, userss: true })
})


router.post('/buy-Now', async (req, res) => {
  let id = req.session.user._id
  let products = await userHelper.buyproduct(id)
  let total = 0
  if (req.session.couponTotal) {
    console.log("coupon applied");
    req.session.total = req.session.couponTotal
    total = req.session.total
  } else {
    total = await userHelper.getBuyNowTotal(req.session.proId)
    req.session.total = total
  }
  userHelper.SingleOrderPlace(req.body, products, total).then((orderId) => {
    req.session.orderId = orderId
    if (req.body['payment'] == 'COD') {
      res.json({ codSuccess: true })
    } else if (req.body['payment'] == 'Razorpay') {
      console.log("razorpay", req.session.total);
      userHelper.generateRazorpay(orderId, total).then((resp) => {
        res.json({ resp, razorpay: true })
      })
    } else {
      val = total / 74
      total = val.toFixed(2)
      req.session.total = total
      console.log(total);
      var create_payment_json = {
        "intent": "sale",
        "payer": {
          "payment_method": "paypal"
        },
        "redirect_urls": {
          "return_url": "http://localhost:3000/success",
          "cancel_url": "http://localhost:3000/cancelled"
        },
        "transactions": [{
          "item_list": {
            "items": [{
              "name": "E-BUY",
              "sku": "007",
              "price": total,
              "currency": "USD",
              "quantity": 1
            }]
          },
          "amount": {
            "currency": "USD",
            "total": total
          },
          "description": "PAY LESS WEAR MORE"
        }]
      };

      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
          throw error;
        } else {
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === 'approval_url') {
              url = payment.links[i].href
              console.log(url);
              res.json({ url })
            }
          }
        }
      });
    }
  })
})


//ORDER CANCEL
router.get('/cancelled', (req, res) => {
  res.render('user/payment-failed', { userss: true, user: req.session.user })
})

//ORER SUCCESS
router.get('/success', (req, res) => {
  console.log("akkusuttuuuu");
  let val = req.session.total
  console.log(req.query);
  const paymentId = req.query.paymentId
  const payerId = req.query.PayerID

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": val
      }
    }]
  }
  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      let id = req.session.user._id
      userHelper.changePaymentStatus(req.session.orderId).then(() => {
        console.log("????????????");
        res.redirect('/order-success')
      })
    }
  })

})


router.get('/orderpay-success', (req, res) => {
  userHelper.clearCart(id).then(() => {
    console.log("cart cleared");

    res.render('user/orderpay-success', { userss: true, user: req.session.user })
  })
})


router.get('/order-success', verifyUserLogin, (req, res) => {
  let user = req.session.user
  let userId = req.session.user._id
  res.render('user/order-success', { userss: true, user })
  userHelper.clearCart(userId)
  console.log("cart cleared");

})
router.get('/payment-canceld', verifyUserLogin, (req, res) => {
  res.render('user/payment-failed', { userss: true, user: req.session.user })

})



//CHANGE PASSWORD
router.get('/change-password', (req, res) => {
  res.render('user/change-password', { userss: true, user: req.session.user, sample: true })
})

router.get('/change-password', verifyUserLogin, async (req, res) => {
  let user = req.session.user

  let cartCount = null
  if (req.session.user) {
    console.log("hy in ");
    let Id = req.session.user._id
    cartCount = await userHelper.getCartCount(Id)
  }
  res.render('user/change-password', { userss: true, user, cartCount, "notSame": req.session.pswdNotSame, "invalid": req.session.invalidpswd, sample: true })
  req.session.pswdNotSame = false
  req.session.invalidpswd = false
})

router.post('/password-change', verifyUserLogin, (req, res) => {
  console.log(req.body, "req");
  let id = req.session.user._id
  let pass1 = req.body.password1
  let pass2 = req.body.password2
  console.log(pass1, " ", pass2);
  if (pass1 == pass2) {
    userHelper.changePassword(id, req.body).then((response) => {
      if (response.status) {
        console.log(response);
        req.session.userloggedIn = false
        req.session.user = null
        res.redirect('/')
      } else {
        req.session.invalidpswd = true
        res.redirect('/change-password')
      }


    })
  } else {
    req.session.pswdNotSame = true
    res.redirect('/change-password')
  }

})
























//single product details


router.get('/singleproduct/:id', verifyUserLogin, async (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  id = req.params.id

  console.log("123345677");
  single = await userHelper.singleproduct(id)
  console.log("are you in product view");
  console.log(single, "66666666");

  adminHelper.getAllproducts().then((products) => {

    res.render('user/singleproduct', { userss: true, single, products, user: req.session.user, })

  })
})




//add address in place order

router.get('/add-new-add', (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

  let user = req.session.user
  res.render('user/add-new-add', { userss: true, user })
})

router.post('/addNewAddress', (req, res) => {


  userHelper.addNewAddress(req.body).then((response) => {

    res.redirect('/place-order')
  })

})



//buy add new address


router.get('/buyaddaddress', (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

  let user = req.session.user

  res.render('user/buyaddNewaddress', { userss: true, user, sample: true })
})

router.post('/addNewBuyAddress', (req, res) => {

  let proId = req.session.proId

  userHelper.addNewBuyAddress(req.body).then((response) => {
    let url = `buyNow/${proId}`

    res.redirect(url)
  })

})












//orders
router.get('/orders', async (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  let user = req.session.user
  let id = req.session.user._id

  console.log(id);
  let cartCount = null
  if (req.session.user) {
    let Id = req.session.user._id
    cartCount = await userHelper.getCartCount(Id)
  }
  userHelper.getUserOrders(id).then((orders) => {
    console.log(orders, "order");
    let len = orders.length

    console.log(len,"orderlength");
    if(len<=0)
    {
      res.render('user/user-orderEmpty',{userss:true,orders,user})
    }


    res.render('user/user-orders', { userss: true, orders, cartCount, user,sample:true })
  })


})
router.get('/singleOrder/:id', async (req, res) => {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  let user = req.session.user
  let oId = req.params.id
  console.log(oId, "order id for view");

  let cartCount = null
  if (req.session.user) {
    let Id = req.session.user._id
    cartCount = await userHelper.getCartCount(Id)
  }
  adminHelper.getOrderProducts(oId).then((products) => {
    res.render('user/single-orders', { userss: true, products, user, cartCount })
  })
})

//login

router.get('/login', function (req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  if (req.session.userloggedIn) {
    res.redirect('/')
  } else {
    res.render('user/userlogin', { sample: true, login: true, "loginErr": req.session.loggedInErr, "blockErr": req.session.blockErr, });
    req.session.blockErr = false
    req.session.loggedInErr = false
  }
});

router.get('/signup', function (req, res, next) {

  if (req.session.userloggedIn) {
    res.redirect('/', { userss: true })
  } else {
    
    res.render('user/usersignup', { signup: true, sample: true, login: true });
  }

});

router.post('/signup', (req, res) => {
  userHelper.doSignup(req.body).then((user) => {
    console.log(req.body.mobile);
    console.log(user, "sample");



    client.verify

      .services(serviceSID)
      .verifications.create({
        to: `+91${req.body.mobile}`,
        channel: "sms"
      }).then((resp) => {
        console.log("mubashir");
        req.session.number = resp.to

        req.session.halflogIn = true
        // res.redirect('/otp');
        res.redirect('/loginotp');
      }).catch((err) => {
        console.log("mubadhir errir");
        console.log(err);
      })

  })

});

router.get('/loginotp', (req, res) => {

  if (req.session.userloggedIn) {
    res.redirect('/')
  } else {

    res.render('user/loginotp', { login: true, otp: true, "invalid": req.session.invalidOtp })
    req.session.invalidOtp = false;
  }
})





router.post('/loginotp', (req, res) => {
  console.log(req.body, "hjh");

  let a = Object.values(req.body.otp)
  let b = a.join('')
  console.log(b, "newww");
  let number = req.session.number
  console.log(number);
  client.verify
    .services(serviceSID)
    .verificationChecks.create({
      to: number,
      code: b
    }).then((response) => {
      console.log("hy avchlghhhhhhhhhhhh");
      if (response.valid) {
        console.log(number, "num");
        userHelper.getUserdetails(number).then((user) => {
          console.log(user);
          req.session.loginHalf = false
          req.session.user = user
          req.session.userloggedIn = true
          res.redirect('/')
        })  
        

      } else {
        console.log("error");
        req.session.invalidOtp = true
        console.log("otp comiing hear");
        res.redirect('/loginotp')
      }

    }).catch((err) => {
      console.log(err, "err");
      if (err.code == 60200) {
        console.log("error code 1");

        req.session.invalidOtp = true
        let otpinvalid = req.session.invalidOtp
        res.redirect('/loginotp')
      } else if (err.code == 60203) {
        console.log("error code 1");
        req.session.maxOtp = true
        res.redirect('/loginotp')
      }


    })

})



router.get('/otp', (req, res) => {

  if (req.session.userloggedIn) {
    res.redirect('/', { userss: true })
  } else {

    res.render('user/otp', { login: true, otp: true, "invalidotp": req.session.invalidOtp })
    req.session.invalidOtp = false
  }
})



router.post('/otp', (req, res) => {
  console.log("junaid");


  let a = Object.values(req.body.otp)
  let b = a.join('')
  console.log(b, "newwwwwwww");
  let number = req.session.number
  client.verify
    .services(serviceSID)
    .verificationChecks.create({
      to: number,
      code: b
    }).then((response) => {
      console.log(response, "junaod");
      if (response.valid) {
        console.log(number, "num");
        userHelper.getUserdetails(number).then((user) => {
          console.log(user, "otpiser");
          req.session.loginHalf = false
          req.session.user = user
          req.session.userloggedIn = true
          res.redirect('/')
        })

      } else {
        console.log("error");
        req.session.invalidOtp = true
        res.redirect('/otp')
      }

    }).catch((err) => {
      console.log(err.code, "err");
      if (err.code == 60200) {
        req.session.invalidOtp = true
        res.redirect('/user/otp')
      } else if (err.code == 60203) {
        req.session.maxOtp = true
        res.redirect('/otp')
      }

    })

})



router.get('/mobile', (req, res) => {
  if (req.session.userloggedIn) {
    res.redirect('/', { userss: true })
  } else {

    res.render('user/mobile', { login: true, "mobile": req.session.noUserMobile, sample: true })
  }
})


router.post('/mobileotp', (req, res) => {
  let No = req.body.mobileNo
  console.log(No, "hu")
  No = `+91${No}`
  userHelper.getUserdetails(No).then((user) => {
    if (user) {
      console.log(user);
      console.log(req.body, "hy");
      client.verify
        .services(serviceSID)
        .verifications.create({
          to: `+91${req.body.mobileNo}`,
          channel: "sms",
        }).then((resp) => {

          console.log(resp.to);
          console.log("hi iam junaid");
          req.session.number = resp.to
          req.session.loginHalf = true
          res.redirect('/otp')
        }).catch((err) => {
          console.log(err, "err");
          req.session.otpErr = true
          res.redirect('/otp')
        })
    } else {
      req.session.noUserMobile = true
      console.log("no user");
      res.redirect('/mobile')
    }
  })


});


// resend session

router.get('/login/resend-otp', (req, res) => {
  console.log("ressend");
  console.log(req.session.number, "reser");
  let number = req.session.number
  client.verify
    .services(serviceSID)
    .verifications.create({
      to: `${number}`,
      channel: "sms"
    }).then((response) => {
      console.log(response, "rse");
      req.session.user = response.user
      req.session.resend = true
      res.redirect('/otp')
    }).catch((err) => {
      console.log(err, "err");
      req.session.otpErr = true
      res.redirect('/login')
    })

})

router.get('/signup/resend-otp', (req, res) => {
  console.log("ressend");
  console.log(req.session.number, "reser");
  let number = req.session.number
  client.verify
    .services(serviceSID)
    .verifications.create({
      to: `${number}`,
      channel: "sms"
    }).then((response) => {
      console.log(response, "rse");
      req.session.user = response.user
      req.session.resend = true
      res.redirect('/loginotp')
    }).catch((err) => {
      console.log(err, "err");
      req.session.otpErr = true
      res.redirect('/signup')
    })

})




router.post('/login', (req, res,) => {
  userHelper.doLogin(req.body).then((response) => {
    if (response.status) {
      console.log("fdhbfhduhu");
      let status = response.user.status

      console.log(response.user);
      if (status) {
        console.log("vanno");

        req.session.user = response.user
        req.session.userloggedIn = true
        res.redirect('/')
      } else {

        req.session.blockErr = true
        req.session.user = null
        req.session.userloggedIn = false

        res.redirect('/login')
      }


    }
    else {
      req.session.loggedInErr = true
      res.redirect('/login')
    }
  })
})
router.get('/logout', (req, res) => {
  req.session.userloggedIn = false
  req.session.user = null
  res.redirect('/login',)
})











router.post('/verify-payment', (req, res) => {
  console.log("in verify payment");
  let id = req.session.user._id
  userHelper.verifyPayment(req.body).then((response) => {
    console.log(req.body);
    userHelper.changePaymentStatus(req.body['order[resp][receipt]']).then(() => {
      console.log("success");
      res.json({ status: true })
      userHelper.clearCart(id).then(() => {
        console.log("cart cleared");

      })
    })
  }).catch((err) => {
    console.log("failed");
    console.log(err, "err");
    res.json({ status: false })
  })
})



// user profile

router.get('/profile', verifyUserLogin, async (req, res) => {
  id = req.session.user._id
  userdetails = await userHelper.getuser(id)
  console.log(userdetails._id, "profileid");
  address = await userHelper.getUserAddress(id)
  res.render('user/profile', { userss: true, address, user: req.session.user, userdetails, profile: true })
})


router.get('/edit-profile/:id', verifyUserLogin, async (req, res) => {
  console.log("hy your ");
  let proID = req.params.id
  id = req.session.user_id

  let profiled = await userHelper.getprofileDetails(proID)

  res.render('user/editprofile', { userss: true, profile: true, profiled, user: req.session.user, sample: true })

})

// change password
router.get('/change-password', verifyUserLogin, async (req, res) => {
  let user = req.session.user

  let cartCount = null
  if (req.session.user) {
    console.log("hy in ");
    let Id = req.session.user._id
    cartCount = await userHelper.getCartCount(Id)
  }
  res.render('user/change-password', { userss: true, user, cartCount, "notSame": req.session.pswdNotSame, "invalid": req.session.invalidpswd, sample: true })
  req.session.pswdNotSame = false
  req.session.invalidpswd = false
})

router.post('/password-change', verifyUserLogin, (req, res) => {
  console.log(req.body, "req");
  let id = req.session.user._id
  let pass1 = req.body.password1
  let pass2 = req.body.password2
  console.log(pass1, " ", pass2);
  if (pass1 == pass2) {
    userHelper.changePassword(id, req.body).then((response) => {
      if (response.status) {
        console.log(response);
        req.session.userloggedIn = false
        req.session.user = null
        res.redirect('/login')
      } else {
        req.session.invalidpswd = true
        res.redirect('/change-password')
      }


    })
  } else {
    req.session.pswdNotSame = true
    res.redirect('/change-password')
  }

})


//forget password

router.get('/forget-passwordmo', (req, res) => {
  console.log("hy in yiru forget password");
  res.render('user/forget-passwordmo', { login: true, "mobile": req.session.noUserMobile, sample: true })
  req.session.noUserMobile = false
  console.log("hy its over");
})
router.get('/forgetotp', (req, res) => {
  res.render('user/forget-otp', { login: true, sample: true, "invalid": req.session.invalidotp })
  req.session.invalidotp = false
  console.log("hy in  y o  ur forget otp");

})

// forget mobile otp

router.post('/forgetotp', (req, res) => {
  console.log("you hear");
  let No = req.body.mobileNo

  No = `+91${No}`
  userHelper.getUserdetailsforget(No).then((user) => {
    if (user) {
      console.log(user);
      console.log(req.body, "hy");
      client.verify
        .services(serviceSID)
        .verifications.create({
          to: `+91${req.body.mobileNo}`,
          channel: "sms",
        }).then((resp) => {

          console.log(resp.to);
          console.log("hi iam junaid");
          req.session.number = resp.to
          req.session.loginHalf = true
          res.redirect('/forgetotp')
        }).catch((err) => {
          console.log(err, "err");
          req.session.otpErr = true
          res.redirect('/forget-passwordmo')
        })
    } else {
      req.session.noUserMobile = true
      console.log("no user");
      res.redirect('/forget-passwordmo')
    }
  })


});
router.get('/recoverpassword', (req, res) => {
  console.log("are you come in m recovr message");

  res.render('user/passwordrecover', { login: true, sample: true, "passwordnotsame": req.session.pswdNotSame })
  req.session.pswdNotSame = false
})

router.post('/recoverpassword', (req, res) => {
  console.log(req.body, "hjh");

  let a = Object.values(req.body.otp)
  let b = a.join('')
  console.log(b, "newww");
  let number = req.session.number
  client.verify
    .services(serviceSID)
    .verificationChecks.create({
      to: number,
      code: b
    }).then((response) => {

      console.log("hy avchlghhhhhhhhhhhh");
      if (response.valid) {
        console.log(number, "num");
        userHelper.getUserdetails(number).then((user) => {
          console.log(user);
          req.session.loginHalf = false
          req.session.user = user
          req.session.userloggedIn = true
          res.redirect('/recoverpassword')
        })

      } else {
        console.log("error");
        req.session.invalidotp = true

        res.redirect('/forgetotp')
      }

    }).catch((err) => {
      console.log(err, "err");
      if (err.code == 60200) {
        console.log("error code 1");

        req.session.invalidOtp = true
        let otpinvalid = req.session.invalidOtp
        res.redirect('/forgetotp')
      } else if (err.code == 60203) {
        console.log("error code 1");
        req.session.maxOtp = true
        res.redirect('/forgetotp')
      }


    })

})


router.post('/change-password', verifyUserLogin, (req, res) => {
  console.log(req.body, "req");
  let id = req.session.user._id
  let pass1 = req.body.password1
  let pass2 = req.body.password2
  console.log(pass1, " ", pass2);
  if (pass1 == pass2) {
    userHelper.changePassword(id, req.body).then((response) => {
      console.log(response);
      req.session.userloggedIn = false
      req.session.user = null
      res.redirect('/login')



    })
  } else {
    req.session.pswdNotSame = true
    res.redirect('/recoverpassword')
  }

})







router.get('/delete-address/:id', verifyUserLogin, (req, res) => {
  console.log("are you in thu=ew");
  let proID = req.params.id
  let uid = req.session.user._id
  console.log(proID);
  console.log(uid);
  console.log("are you in address list");
  console.log(proID, ">>>>>>>>>>");
  userHelper.deleteAddress(proID, uid).then((response) => {
    console.log("mmmmmmmm");
    res.redirect('/profile')
  })
})
router.post('/edit-profile', (req, res) => {
  console.log("are you in edit profile");
  let id = req.session.user._id
  userHelper.updateprofile(id, req.body)
  console.log(req.body)
  res.redirect('/profile')
})

router.get('/addprofile-address', verifyUserLogin, (req, res) => {
  console.log("profile address222222222222222222222222222222222");
  let user = req.session.user
  console.log("still n profile");
  res.render('user/profile-address', { userss: true, user, sample: true })
})
router.post('/addprofileAddress', (req, res) => {


  userHelper.addNewAddress(req.body).then((response) => {

    res.redirect('/profile')
  })

})

router.get('/editaddress/:id', verifyUserLogin, async (req, res) => {
  let user = req.session.user._id
  id = req.params.id
  console.log(id, "paramas id");
  address = await userHelper.edituseraddress(id, user)

  console.log(address);

  res.render('user/editaddress', { userss: true, address, user: req.session.user, profile: true, sample: true })
})

router.post('/editprofile-address/:id', (req, res) => {
  console.log("are you in edit profile");
  userid = req.session.user._id
  id = req.params.id
  userHelper.updateproaddress(id, req.body, userid)
  console.log(req.body);
  res.redirect('/profile')
  // let image = req.files.image
  // image.mv('public/profile-images/' + id + '.jpg')
})


// COUPON

router.post('/couponApply', (req, res) => {
  id=req.session.user._id
  console.log(req.body);
  userHelper.couponValidate(req.body,id).then((response) => {
    req.session.couponTotal = response.total
    if (response.success) {
      res.json({ couponSuccess: true, total: response.total })
    } else if (response.couponUsed) {
      res.json({ couponUsed: true })
    }
    else if (response.couponExpired) {
      res.json({ couponExpired: true })
    }
    else if(response.invalidCoupon){
      res.json({ invalidCoupon: true })
    }
    console.log(response);
  })
})




//order cancel user 

router.get('/cancelled/:id', (req, res) => {
  Status= 'Cancelled'


  adminHelper.changeOrderStatus(req.params.id,  Status).then(() => {

  
    res.redirect('/orders')
  })
})

router.post('/cancelOrder', (req, res) => {
  console.log("api call");
  let id = req.body.id
  userHelper.cancelOrder(id).then((response) => {
    // res.redirect('/myOrders')
    res.json({ status: true })
  })
})


// categories

router.get('/casuals', verifyUserLogin, async (req, res) => {
  let products = adminHelper.getAllproducts()
  await userHelper.getcatgeorywise().then((categoryItems) => {
    console.log(categoryItems, "your cat items");
    res.render('user/casuals', { userss: true, user: req.session.user, categoryItems, products })
  })


})


router.get('/sports', verifyUserLogin, async (req, res) => {
  let products = adminHelper.getAllproducts()
  await userHelper.getcatgeorywisesports().then((sportsItems) => {

    console.log(sportsItems, "your cat items");
    res.render('user/sports', { userss: true, user: req.session.user, sportsItems, products })
  })


})

router.get('/dress', verifyUserLogin, async (req, res) => {
  let products = adminHelper.getAllproducts()
  await userHelper.getcatgeorywisedress().then((dressItems) => {

    console.log(dressItems, "your cat items");
    res.render('user/dress', { userss: true, user: req.session.user, dressItems, products })
  })


})
module.exports = router;