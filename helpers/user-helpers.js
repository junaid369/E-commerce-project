
var db = require('../config/connection')
var collection = require('../config/collection')
var bcrypt = require('bcryptjs');
const objectId = require('mongodb').ObjectID
const { resolve, reject } = require('promise')
const { ObjectId } = require('bson')
const { response } = require('express')
const moment = require('moment')
const Razorpay = require('razorpay')
// const { promisify } = require('util')
var instance = new Razorpay({
    key_id:process.env.key_id,
    key_secret: process.env.key_secret,
});
module.exports = {
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            user = {
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                mobile: `+91${userData.mobile}`,
                password: userData.password,
                status: true,

            }
            db.get().collection(collection.USER_COLLECTION).insertOne(user).then((data) => {
                resolve(data)
            })
        })
    },
    doLogin: (userData) => {
        console.log(userData);
        return new Promise(async (resolve, reject) => {
            try {
                let loginStatus = false
                number = `+91${userData.mobile}`
                let response = {}
                let user = await db.get().collection(collection.USER_COLLECTION).findOne({ mobile: number })
                console.log(user);
                if (user) {

                    bcrypt.compare(userData.password, user.password).then((status) => {
                        if (status) {
                            console.log("login success");
                            response.user = user
                            response.status = true
                            resolve(response)
                            // console.log("Response");
                            console.log(response);

                        } else {
                            console.log("Login Failed");
                            resolve({ status: false })
                        }
                    })
                } else {
                    console.log("Failed");
                    resolve({ status: false })
                }

            } catch (error) {
                console.log(error);
            }

        })
    },

    addproduct: (userData) => {
        return new Promise(async (resolve, reject) => {

            db.get().collection(collection.BRAND_COLLECTION).insertOne(user).then((data) => {
                resolve(data)
            })
        })
    },
    getUserdetails: (No) => {
        New = `+91${No}`
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ mobile: New })
            resolve(user)
            console.log(user, "hy abcd");
        })
    },







    addUser: (userData, callback) => {
        return new Promise(async (resolve, reject) => {
            userData.pw = await bcrypt.hash(userData.pw, 10)
            user = {
                name: userData.name,
                email: userData.email,
                status: "Active",
                pw: userData.pw

            }
            db.get().collection(collection.USER_COLLECTION).insertOne(user).then(() => {

                resolve()
            })
        })
    },





    getAllUser: () => {
        return new Promise(async (resolve, reject) => {
            let users = await db.get().collection(collection.USER_COLLECTION).find().toArray()
            console.log(users);
            resolve(users)
        })
    },

    // useraddress: () => {
    //     return new Promise(async (resolve, reject) => {
    //         let users = await db.get().collection(collection.USER_COLLECTION).find().toArray()
    //         // console.log(users);
    //         resolve(users)
    //     })
    // },



    getActiveUsers: () => {
        return new Promise(async (resolve, reject) => {
            let activeUsers = await db.get().collection(collection.USER_COLLECTION).find({ status: true }).toArray()
            resolve(activeUsers)
        })

    },
    getBlockedUsers: () => {
        return new Promise(async (resolve, reject) => {
            let blockedUsers = await db.get().collection(collection.USER_COLLECTION).find({ status: false }).toArray()
            resolve(blockedUsers)
        })

    },
    // getUserdetail: (Id) => {
    //     console.log(Id);
    //     return new Promise(async (resolve, reject) => {
    //         let user = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: Id })
    //         console.log(user,"764957932");
    //         if (user) {
    //             resolve(user)


    //         } else {
    //             console.log("else");
    //             resolve(false)

    //         }
    //     })


    // },
    getUserdetails: (number) => {
        console.log(number);
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ mobile: number })
            console.log(user, "764957932");
            if (user) {
                resolve(user)


            } else {
                console.log("else");
                resolve(false)

            }
        })


    },
    getUserotp: (number) => {
        console.log(number);
        //  number=`+91${number}`
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ mobile: number })
            console.log(user, "764957932");
            if (user) {
                resolve(user)


            } else {
                console.log("else");
                resolve(false)

            }
        })


    },
    blockUser: (Id, userData) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).updateOne({ _id: objectId(Id) },
                {
                    $set: {
                        status: false
                    }
                }).then((response) => {
                    resolve(response)
                    console.log(response, "res");
                })
        })
    },
    unblockUser: (Id) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).updateOne({ _id: objectId(Id) },
                {
                    $set: {
                        status: true
                    }
                }).then((response) => {
                    resolve(response)
                    console.log(response, "res");
                })
        })
    },





    addTocart: (proId, userId) => {
        let proobj = {
            item: ObjectId(proId),
            quantity: 1
        }
        console.log("cart abc");
        return new Promise(async (resolve, reject) => {
            let userCart = await db.get().collection(collection.CART_COLLECTION).findOne({ user: ObjectId(userId) })
            console.log("cart is no more");
            if (userCart) {
                // console.log(products.item);
                let proexist = userCart.products.findIndex(product => product.item == proId)
                console.log(proexist, "hy this important");
                if (proexist == -1) {

                    db.get().collection(collection.CART_COLLECTION).updateOne({ user: ObjectId(userId) },
                        {


                            $push: { products: proobj }
                        }


                    ).then((response) => {
                        resolve()
                    })


                } else {

                    db.get().collection(collection.CART_COLLECTION).updateOne({ user: ObjectId(userId), 'products.item': ObjectId(proId) },

                        {
                            $inc: { 'products.$.quantity': 1 }
                        }
                    ).then(() => {
                        resolve()
                    })

                }

            }
            else {

                let cartobj = {

                    user: ObjectId(userId),
                 
                    products: [proobj]
               
                }


                db.get().collection(collection.CART_COLLECTION).insertOne(cartobj).then((response) => {
                    resolve()
                    console.log(cartobj);
                    console.log("cart still alive");

                })

            }
        })
    },

    // getcartcount: (userId) => {
    //     console.log(userId, "54654656");
    //     return new Promise(async (resolve, reject) => {
    //         let count = 0
    //         let cart = await db.get().collection(collection.CART_COLLECTION).findOne({ user: ObjectId(userId) })
    //         console.log(cart, 'cartcount');
    //         if (cart !== null) {

    //             count = cart.products.length
    //             resolve(count)
    //         } else {

    //             resolve({ count: null })
    //         }
    //     })
    // },


    getcartcount: (userId) => {
        return new Promise(async (resolve, reject) => {
            let count = 0
            let cart = await db.get().collection(collection.CART_COLLECTION).findOne({ user: ObjectId(userId) })
            console.log(cart, "cart");

            if (cart) {
                count = cart.products.length
            }
            resolve(count)
        })
    },
    getcartproducts: (userid) => {
        return new Promise(async (resolve, reject) => {
            let cartitems = await db.get().collection(collection.CART_COLLECTION).aggregate([
                {
                    $match: { user: ObjectId(userid) }
                },
                {
                    $unwind: "$products"
                },
                {
                    $project: {
                        item: "$products.item",
                        quantity: '$products.quantity'
                    }
                },
                {
                    $lookup: {
                        from: collection.PRODUCT_COLLECTION,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $project: {
                        item: 1, quantity: 1, product: { $arrayElemAt: ['$product', 0] }

                    }
                }
            ]).toArray()
            // console.log(cartitems[0].products);

            resolve(cartitems)

        })

    },
    changeProductCount: (detailes) => {
        console.log("are you coming my quantty page");
        count = parseInt(detailes.count)
        quantity = parseInt(detailes.quantity)
        console.log(quantity);
        console.log(count);
        return new Promise((resolve, reject) => {
            if (count == -1 && quantity == 1) {
                db.get().collection(collection.CART_COLLECTION)
                    .updateOne({ _id: ObjectId(detailes.cart) },
                        {
                            $pull: { products: { item: ObjectId(detailes.product) } }
                        }).then((response) => {
                            resolve({ removeProduct: true })
                        }
                        )
            } else {

                // db.get().collection(collection.CART_COLLECTION).updateOne({user:ObjectId(userId), 'products.item': ObjectId(proId) },

                // {
                //     $inc: { 'products.$.quantity': 1 }
                // }



                // console.log(detailes.cart,"djkslnj");


                db.get().collection(collection.CART_COLLECTION)
                    .updateOne({ _id: ObjectId(detailes.cart), 'products.item': ObjectId(detailes.product) },
                        {
                            $inc: { 'products.$.quantity': count }
                        }).then((response) => {
                            resolve(response)
                        })
            }

        })
    },
    deleteCartProduct: (deatailes) => {

        return new Promise((resolve, reject) => {
            db.get().collection(collection.CART_COLLECTION).updateOne(
                { _id: ObjectId(deatailes.cartId) },
                {
                    $pull: { products: { item: ObjectId(deatailes.proId) } }
                }).then((response) => {

                    resolve({ removeProduct: true })
                })
        })
    },
    singleproduct: (proId) => {
        return new Promise(async (resolve, reject) => {
            console.log('djdjghfshdgfhsdgfhsdgfdgfsdjfhgsdjhgfdjhfdjfgjdfdgfjdgfjsdgf');
            let SD = await db.get().collection(collection.PRODUCT_COLLECTION).findOne({ _id: ObjectId(proId) })
                .then((response) => {
                    resolve(response)
                })
        })

    },
    // getTotalAmount: (userId) => {
    //     console.log("MMMMMMMMM");
    //     console.log(userId,"your user id");
    //     return new Promise(async (resolve, reject) => {
    //         let total = await db.get().collection(collection.CART_COLLECTION).aggregate([
    //             {
    //                 $match: { user: ObjectId(userId) }
    //             },
    //             {
    //                 $unwind: "$products"
    //             },
    //             {
    //                 $project: {
    //                     item: "$products.item",
    //                     quantity: '$products.quantity'
    //                 }
    //             },
    //             {
    //                 $lookup: {
    //                     from: collection.PRODUCT_COLLECTION,
    //                     localField: 'item',
    //                     foreignField: '_id',
    //                     as: 'product'
    //                 }
    //             },
    //             {
    //                 $project: {

    //                     item: 1, quantity: 1, product: { $arrayElemAt: ['$product', 0] }

    //                 }

    //             },
    //             {
    //                 $group: {
    //                     _id: null,
    //                     total: { $sum: { $multiply: [{ '$toInt': '$quantity' }, { '$toInt': '$product.PPrice' }] } }
    //                 }

    //             }

    //         ]).toArray()
    //         console.log(">>>>>>>>>");

    //         console.log(total[0].total);
    //         resolve(total[0].total)

    //     })

    // },










getTotalAmount: (userId) => {
    return new Promise(async (resolve, reject) => {
        let cart = await db.get().collection(collection.CART_COLLECTION).findOne({ user: ObjectId(userId) })
        if (cart) {
            if (cart.products.length > 0) {
                let total = await db.get().collection(collection.CART_COLLECTION).aggregate([
                    {
                        $match: { user: objectId(userId) }
                    },
                    {
                        $unwind: '$products'
                    },
                    {
                        $project: {
                            item: '$products.item',
                            quantity: '$products.quantity'
                        }
                    },
                    {
                        $lookup: {
                            from: collection.PRODUCT_COLLECTION,
                            localField: 'item',
                            foreignField: '_id',
                            as: 'product'
                        }
                    },
                    {
                        $project: {
                            item: 1,
                            quantity: 1,
                            product: { $arrayElemAt: ['$product', 0] }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total: { $sum: { $multiply: [{ '$toInt': '$quantity' }, { '$toInt': '$product.PPrice' }] } }
                        }
                    }
                ]).toArray()
                resolve(total[0].total)
            } else {
                console.log('no products');
                let total = [{ total: 0 }]
                resolve(total[0].total)
            }
        } else {
            console.log("No cart");
            resolve()
        }
    }).catch((err) => {
        resolve(err)
    })
},
    getSubTotal: (userId, proId) => {
        console.log(userId,"m");
        console.log(proId,"l");
        return new Promise(async (resolve, reject) => {
            let subtotal = await db.get().collection(collection.CART_COLLECTION).aggregate([
                {
                    $match: {
                        user: ObjectId(userId)
                    }
                },
                {
                    $unwind: '$products'
                },
                {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity'
                    }
                },
                {
                    $lookup: {
                        from: collection.PRODUCT_COLLECTION,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'products'

                    }
                },
                {
                    $match: {
                        item: ObjectId(proId)
                    }
                },
                {
                    $project: {
                        item: 1, quantity: 1, product: { $arrayElemAt: ['$products', 0] }

                    }

                },
                {
                    $project: {
                        unitPrice: { $toInt: '$product.PPrice' },
                        quantity: { $toInt: '$quantity' }
                    }
                },
                {
                    $project: {
                        _id: null,
                        subtotal: { $sum: { $multiply: ['$quantity', '$unitPrice'] } }
                    }
                }

            ]).toArray()
            console.log(subtotal, "in u");
            if (subtotal.length > 0) {
                resolve(subtotal[0].subtotal)
                console.log(subtotal[0].subtotal, "hy  still in plus stage");
            }
            else {
                subtotal = 0
                resolve(subtotal)
            }


        })
    },
    getBuyNowTotal: (pId) => {
        return new Promise(async (resolve, reject) => {
            let product = await db.get().collection(collection.PRODUCT_COLLECTION).findOne({ _id: ObjectId(pId) })
        
            resolve(product.PPrice)
            console.log(product.PPrice);
            console.log("your product");
        })
    },



    
    addNewAddress: (details) => {
        console.log(details.User);

        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectId(details.User) })
            details._id = new (ObjectId)
            console.log(details._id);
            if (user.address) {
                db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(details.User) }, {
                    // $set:{
                    //     _id:new(ObjectId)

                    // },
                    $push: {
                        address: details,

                    }
                }).then(() => {
                    resolve()
                })
            } else {
                console.log('on else');

                addr = [details]
                db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(details.User) }, {
                    $set: {
                        address: addr,
                    }
                }).then((user) => {
                    resolve(user)
                })
            }

        })
    },
    addNewBuyAddress: (details) => {
        console.log(details.User);

        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectId(details.User) })
            details._id = new (ObjectId)
            console.log(details._id);
            if (user.address) {
                db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(details.User) }, {
                    // $set:{
                    //     _id:new(ObjectId)

                    // },
                    $push: {
                        address: details,

                    }
                }).then(() => {
                    resolve()
                })
            } else {
                console.log('on else');

                addr = [details]
                db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(details.User) }, {
                    $set: {
                        address: addr,
                    }
                }).then((user) => {
                    resolve(user)
                })
            }

        })
    },
    placeOrder: (order, products, total) => {
        return new Promise((resolve, reject) => {
            console.log(order, products, total);
            let Status = order.payment === 'COD' ? 'Placed' : 'Pending'


            let dateIso = new Date()
            let date = moment(dateIso).format('YYYY/MM/DD')
            let time = moment(dateIso).format('HH:mm:ss')
            let orderObj = {
                deliveryDetails: {
                    FirstName: order.FirstName,
                    LastName: order.LastName,
                    House: order.House,
                    Street: order.Street,
                    Town: order.Town,
                    PIN: order.PIN,
                    Mobile: order.Mobile
                },
                // Email: order.Email,
                User: order.User,
                PaymentMethod: order.payment,
                Products: products,
                Total: total,
                // Discount: order.Discount,
                Date: date,
                Time: time,
                Status: Status

            }
            console.log("order obj=",orderObj);

            db.get().collection(collection.ORDER_COLLECTION).insertOne(orderObj).then((response) => {

                // db.get().collection(collection.CART_COLLECTION).deleteOne({ user: ObjectId(order.User) })
                // resolve(response)
                resolve(response.insertedId.toString())
            })

        })

    },
    buyOrder: (order, products, total) => {
        console.log(order, "&&&&&&&&&");
        console.log("products=", products);
        return new Promise((resolve, reject) => {
            console.log(order, products, total);
            let Status = order.Payment === 'COD' ? 'Placed' : 'Pending'


            let dateIso = new Date()
            let date = moment(dateIso).format('YYYY/MM/DD')
            let time = moment(dateIso).format('HH:mm:ss')
            let orderObj = {
                deliveryDetails: {
                    FirstName: order.FirstName,
                    LastName: order.LastName,
                    House: order.House,
                    Street: order.Street,
                    Town: order.Town,
                    PIN: order.PIN,
                    Mobile: order.Mobile
                },
                // Email: order.Email,
                User: order.User,
                PaymentMethod: order.payment,
                Products: products,
                Total: total,
                // Discount: order.Discount,
                Date: date,
                Time: time,
                Status: Status

            }

            db.get().collection(collection.ORDER_COLLECTION).insertOne(orderObj).then((response) => {
                // db.get().collection(collection.CART_COLLECTION).deleteOne({ user: ObjectId(order.User) })
                resolve(response)
            })

        })

    },
    getCartProductList: (userId) => {
        return new Promise(async (resolve, reject) => {
            console.log("in cart product lit");
            let cart = await db.get().collection(collection.CART_COLLECTION).findOne({ user: ObjectId(userId) })
            console.log(cart, "32545");
            console.log(cart.products)
            resolve(cart.products)
        })
    },
    getUserAddress: (userId) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectId(userId) })
            let address = user.address
            resolve(address)
        })



    },
    // deleteAddress: (userId) => {
    //     return new Promise(async (resolve, reject) => {
    //         let user = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectId(userId) })
    //         if (user.address) {
    //             db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(userId) }, {
    //                 $pull: {
    //                     address: { User: userId }
    //                 }
    //             }).then(() => {
    //                 resolve()
    //             })
    //         }
    //     })
    // },
    deleteAddress: (proid, userId) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectId(userId) })
            if (user.address) {
                db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(userId) }, {
                    $pull: {
                        address: { _id: ObjectId(proid) }
                    }
                }).then(() => {
                    resolve(response)
                })
            }
        })
    },
    getUserOrders: (Id) => {
        return new Promise(async (resolve, reject) => {
            let orders = await db.get().collection(collection.ORDER_COLLECTION).find({ User: Id }).sort({ Date: -1 }).toArray()
            console.log(orders);
            console.log("sortted");
            resolve(orders)
        })
    },
    addressChecker: (userId) => {
        return new Promise(async (resolve, reject) => {
            let status = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectId(userId) })
            if (user.address) {
                status.address = true
            }
            resolve(status)
        })
    },
    getCartCount: (userId) => {
        return new Promise(async (resolve, reject) => {

            let count = 0
            let cart = await db.get().collection(collection.CART_COLLECTION).findOne({ user: ObjectId(userId) })
            if (cart) {

                count = cart.products.length
                console.log(count);
            } else {
                console.log('test');
            }

            resolve(count)
        })

    },
    generateRazorpay: (orderId, total) => {
        console.log(orderId, "order id in generate");
        console.log(total,"total in generate");
        return new Promise((resolve, reject) => {
            var options = {
                amount: total * 100,
                currency: "INR",
                receipt: "" + orderId
            }
    
            instance.orders.create(options, function (err, order) {
                if (err) {
                    console.log(err);
                }
                console.log("new order", order);
                resolve(order)
            })


        })

    },
    verifyPayment: (details) => {
        console.log(details);
        return new Promise((resolve, reject) => {
            const crypto = require('crypto');
            let hmac = crypto.createHmac('sha256', 'CAhNgb2cJaDLqKtrS0nnBzrv')
            hmac.update(details['payment[razorpay_order_id]'] + '|' + details['payment[razorpay_payment_id]'])
            hmac = hmac.digest('hex')
            if (hmac == details['payment[razorpay_signature]']) {
                resolve()

            } else {
                reject()
            }


        })
    },
    changePaymentStatus: (orderId) => {
        console.log(orderId,"OOO");
        return new Promise((resolve, reject) => {
            console.log("XXXXXXXXXXXXXXXX");
            db.get().collection(collection.ORDER_COLLECTION).updateOne({ _id: ObjectId(orderId) },
            
                {
                
                    $set: {
                        Status:'placed'
                    }
                }
            ).then((response) => {
                resolve(response)
                console.log(response,"QQQQQQQ");
              
            })
        })
    },

    getuser: (userId) => {
        return new Promise(async (resolve, reject) => {
  
            console.log("still in profile");
            let userdetails = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectId(userId) })
            console.log("after function");
            console.log(userdetails);
            resolve(userdetails)

        })
    },
    clearCart: (user) => {
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collection.CART_COLLECTION).deleteOne({ user: ObjectId(user) }).then((response)=>{
                resolve(response)

        })
     
        })
      
    },
    getprofileDetails: (proId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectId(proId) }).then((profile) => {
                resolve(profile)
                console.log(profile, "+++++++++");
            })
        })
    },
    updateprofile: (userId, profileData) => {

        return new Promise(async (resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION)
                .updateOne({ _id: ObjectId(userId) }, {
                    $set: {
                        firstname: profileData.name,
                        lastname: profileData.lastname,
                        email: profileData.email,
                        mobile: profileData.number,

                    }
                }).then((response) => {
                    resolve(response)
                    console.log(response);
                })
        })
    },
    //     edituseraddress:(id,userId)=>{


    //         return new Promise(async(resolve, reject) => {
    //             let user = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectId(userId) })
    //             if (user.address) {

    //                 db.get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectId(id) }, {




    //             })

    //             .then(() => {
    //                 resolve(address[0])

    //                 console.log(address[0],"$$$$$$$$$$$$$$$");
    //             })
    //         }
    //     })
    // },
    edituseraddress: (id, userId) => {


        return new Promise(async (resolve, reject) => {
            address = await db.get().collection(collection.USER_COLLECTION).aggregate([
                {
                    $match: {
                        _id: ObjectId(userId)
                    }
                },
                {
                    $unwind: "$address"
                },
                {
                    $match: {
                        "address._id": ObjectId(id)
                    }
                },
                {
                    $project: {
                        address: 1,
                        _id: 0
                    }
                },

            ]).toArray()
            resolve(address)
            console.log(address, "LLLLLLLLLLL");


        })
    },


    // updateproaddress: (userId, details) => {

    //     return new Promise(async (resolve, reject) => {
    //         db.get().collection(collection.USER_COLLECTION)
    //             .updateOne({ _id: ObjectId(userId) }, {
    //                 $set: {
    //                     FirstName: details.FirstName,
    //                     LastName: details.LastName,
    //                     House: details.House,
    //                     Street:details.Street,
    //                     Town:details.Town,
    //                     PIN:details.PIN,

    //                 }
    //             }).then((response) => {
    //                 resolve(response)
    //                 console.log(response);
    //             })
    //     })
    // },



    updateproaddress: (aId, AddData, userId) => {
        return new Promise((resolve, reject) => {
            user = db.get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectId(userId) }).then(() => {
                if (user) {
                    db.get().collection(collection.USER_COLLECTION).updateOne({ address: { $elemMatch: { _id: ObjectId(aId) } } }, {
                        $set: {
                            "address.$.FirstName": AddData.FirstName,
                            "address.$.LastName": AddData.LastName,
                            "address.$.House": AddData.House,
                            "address.$.Street": AddData.Street,
                            "address.$.Town": AddData.Town,
                            "address.$.PIN": AddData.PIN

                        }
                    }).then((response) => {
                        resolve(response)
                    })
                }
            })
        })
    },
    changePassword: (Id, data) => {
        return new Promise(async (resolve, reject) => {
        

            let p1 = data.password1
            let p2 = data.password2
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectId(Id) })
            if (user) {

                data1 = await bcrypt.hash(data.password1, 10)

                        db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(Id) }, {
                            $set: {
                                password: data1
                            }
                        }).then(() => {
                            resolve(response)
                            console.log(response, "then");
                        }
                        )
                    
                
             




            }

      
    })
},

    buyproduct: (id) => {
        console.log(id, "shwo the id");
        return new Promise(async (resolve, reject) => {

            let proObj={
                item:ObjectId(id),
                quantity:1

            }
            let product=[proObj]
            resolve(product)
           


        })
    },


   buyproductdetails:(id)=>{
       return new Promise(async(resolve,reject)=>{
buyproduct=await db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:ObjectId(id)})
resolve(buyproduct)
console.log(buyproduct,"???????");
console.log(buyproduct.PPrice,"yourprice");
       })
   },
   

    // addTowishlist: (proId, userId) => {
    //     console.log("are you in wish");
    //     let wishobj = {
    //         item: ObjectId(proId),
    //     }
    //     console.log("cart abc");
    //     return new Promise(async (resolve, reject) => {
    //         let userwishlist = await db.get().collection(collection.WISHLIST_COLLECTION).findOne({ user: ObjectId(userId) })
    //         console.log("cart is no more");
    //         if (userwishlist) {
    //             db.get().collection(collection.WISHLIST_COLLECTION).updateOne({ user: ObjectId(userId) },
    //                 {
    //                     $push: { products: wishobj }
    //                 }
    //             )
    //                 .then((response) => {
    //                     resolve(response)
    //                 })
    //             console.log("hy its final");

    //         } else {

    //             let wishlistobj = {

    //                 user: ObjectId(userId),

    //                 products: [wishobj]

    //             }


    //             db.get().collection(collection.WISHLIST_COLLECTION).insertOne(wishlistobj).then((response) => {
    //                 resolve(response)
    //                 console.log(response);
    //                 console.log("cart still alive");

    //             })

    //         }
    //     })
    // },





    addToWishlist: (proId, userId) => {
        let wishObj = {
            item: ObjectId(proId)
        }
        return new Promise(async (resolve, reject) => {
            let userWish = await db.get().collection(collection.WISHLIST_COLLECTION).findOne({ user: objectId(userId) })
            if (userWish) {
                let proExist = await userWish.products.findIndex(product => product.item == proId)
                if (proExist != -1) {
                    db.get().collection(collection.WISHLIST_COLLECTION).updateOne({ user: objectId(userId) },
                        {
                            $pull: {
                                products: { item: objectId(proId) }
                            }
                        }).then((response) => {
                            console.log("pulled");
                            resolve({ pulled: true })
                        })
                } else {
                    db.get().collection(collection.WISHLIST_COLLECTION).updateOne({ user: objectId(userId) },
                        {
                            $push: {
                                products: wishObj
                            }
                        }).then(() => {
                            console.log("pushed");
                            resolve({ pushed: true })
                        })
                }
            } else {
                let wish = {
                    user: objectId(userId),
                    products: [wishObj]
                }
                db.get().collection(collection.WISHLIST_COLLECTION).insertOne(wish).then((reponse) => {
                    resolve(response)
                    console.log(" Craeted new wishlist");
                })
            }
        })
    },
    getwishcount: (userId) => {
        console.log(userId, "54654656");
        return new Promise(async (resolve, reject) => {
            let count = 0
            let wishlist = await db.get().collection(collection.WISHLIST_COLLECTION).findOne({ user: ObjectId(userId) })
            console.log(wishlist, 'dfghjkl');
            if (wishlist !== null) {

                count = wishlist.products.length
                resolve(count)
            } else {

                resolve()
            }
        })
    },

    getwishitems: (userid) => {
        return new Promise(async (resolve, reject) => {
            let wishitems = await db.get().collection(collection.WISHLIST_COLLECTION).aggregate([
                {
                    $match: { user: ObjectId(userid) }
                },
                {
                    $unwind: "$products"
                },
                {
                    $project: {
                        item: "$products.item",

                    }
                },
                {
                    $lookup: {
                        from: collection.PRODUCT_COLLECTION,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'product'
                    }
                },
                {
                    $project: {
                        item: 1, product: { $arrayElemAt: ['$product', 0] }

                    }
                }
            ]).toArray()


            resolve(wishitems)

        })

    },
    deletewishProduct: (deatailes) => {

        return new Promise((resolve, reject) => {
            db.get().collection(collection.WISHLIST_COLLECTION).updateOne(
                { _id: ObjectId(deatailes.wishId) },
                {
                    $pull: { products: { item: ObjectId(deatailes.proId) } }
                }).then((response) => {

                    resolve({ removeProduct: true })
                })
        })
    },

    // forget password login
    getUserdetailsforget: (number) => {
        console.log(number);
        //  number=`+91${number}`
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ mobile: number })
            console.log(user, "764957932");
            if (user) {
                resolve(user)


            } else {
                console.log("else");
                resolve(false)

            }
        })



    },


    // COUPON



    couponValidate: (data,user) => {
        return new Promise(async (resolve, reject) => {
            console.log(data,"mj");
            obj = {}
            let date = new Date()
            date = moment(date).format('DD/MM/YYYY')
            console.log("data=",data);
            let coupon = await db.get().collection(collection.COUPON_OFFERS).findOne({ CouponCode: data.Coupon})
            console.log(coupon);
            if (coupon) {

                let users = coupon.Users
                let userChecker = users.includes(user)
                if (userChecker) {
                    obj.couponUsed = true
                    console.log("Already used");
                    resolve(obj)
                }
                else{

             




                if (date <= coupon.expirydate) {
                    if (coupon.Status == 1) {
                        let total = parseInt(data.Total)
                        let percentage = parseInt(coupon.discount)
                        let discountVal = ((total * percentage) / 100).toFixed()
                        console.log(discountVal);
                        obj.total = total - discountVal
                        obj.success = true
                        resolve(obj)
                        resolve(data)
                      

                    } else {
                        obj.couponUsed = true
                        console.log("Already used");
                        resolve(obj)
                    }
                } else {
                    obj.couponExpired = true
                    console.log("Expired");
                    resolve(obj)
                }
            }
         } else {
                obj.invalidCoupon = true
                console.log("invalid");
                resolve(obj)
                console.log(obj,"mj");
            }


        })


    },


    getcatgeorywise: () => {
        console.log();
        return new Promise(async (resolve, reject) => {
            let categoryItems = await db.get().collection(collection.PRODUCT_COLLECTION).aggregate([
                {
                    $match: { cat: "casuals" }
                },

            ])
                .toArray()

            resolve(categoryItems)
            console.log(categoryItems);
        })
    },

    getcatgeorywisesports: () => {
        console.log();
        return new Promise(async (resolve, reject) => {
            let sportsItems = await db.get().collection(collection.PRODUCT_COLLECTION).aggregate([
                {
                    $match: { cat: "sports" }
                },

            ])
                .toArray()

            resolve(sportsItems)
            console.log(sportsItems);
        })
    },


    getcatgeorywisedress: () => {
        console.log();
        return new Promise(async (resolve, reject) => {
            let dressItems = await db.get().collection(collection.PRODUCT_COLLECTION).aggregate([
                {
                    $match: { cat: "dress" }
                },

            ])
                .toArray()

            resolve(dressItems)
            console.log(dressItems);
        })
    },


    SingleOrderPlace: (order, products, total) => {
        return new Promise((resolve, reject) => {

            let Status = order.payment === 'COD' ? 'Placed' : 'Pending'
            let dateIso = new Date()
            let date = moment(dateIso).format('YYYY/MM/DD')
            let time = moment(dateIso).format('HH:mm:ss')
            let orderObj = {
                deliveryDetails: {
                    FirstName: order.FirstName,
                    LastName: order.LastName,
                    House: order.House,
                    Street: order.Street,
                    Town: order.Town,
                    PIN: order.PIN,
                    Mobile: order.Mobile
                },
                // Email: order.Email,
                User: order.User,
                PaymentMethod: order.Payment,
                Products: products,
                Total: total,
                // Discount: order.Discount,
                Date: date,
                Time: time,
                Status: Status
                

            }

            db.get().collection(collection.ORDER_COLLECTION).insertOne(orderObj).then((response) => {
               
                
                resolve(response.insertedId.toString())
            })

        })

    },
}

