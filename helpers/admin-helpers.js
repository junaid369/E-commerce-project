






var db = require('../config/connection')
var collection = require('../config/collection')
var bcrypt = require('bcryptjs');
const objectId = require('mongodb').ObjectID
const moment = require('moment')
const { ObjectId } = require('bson')
const { response } = require('../app')



module.exports = {
    // doAdminLogin: (adminData) => {
    //     console.log("!!!!!!!!!!!!1111");
    //     console.log(adminData);
    //     return new Promise(async (resolve, reject) => {
    //         let loginStatus = false
    //         let responseAdmin = {}
    //         let admin = await db.get().collection(collection.ADMIN_COLLECTTION_COLLECTTION).findOne({ email: adminData.email })
    //         console.log("bbbbbbbbbbbb");
    //         if (admin) {
    //             console.log(admin,"!!!!!!!!!!!!!");


    //             if (adminData.password == admin.password) {
                  

    //                 responseAdmin.admin = admin
    //                 responseAdmin.status = true
    //                 resolve(responseAdmin)
    //             } else {

    //                 resolve({ status: false })
    //             }

    //         } else {

    //             resolve({ status: false })
    //         }
    //     })
    // },



    doAdminLogin: (adminData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let responseAdmin = {}
            console.log(adminData.email);
            let admin = await db.get().collection(collection.ADMIN_COLLECTTION).findOne({email:adminData.email })
            console.log(admin);
            
            if (admin) {


                if (adminData.password == admin.password) {
                    console.log("login success");
                    responseAdmin.admin = admin
                    responseAdmin.status = true
                    resolve(responseAdmin)
                } else {
                    console.log("Login Failed");
                    resolve({ status: false })
                }

            } else {
                console.log("Failed");
                resolve({ status: false })
            }
        })
    },
    addbrands: (adminData) => {
        return new Promise(async (resolve, reject) => {

            db.get().collection(collection.BRAND_COLLECTION).insertOne(adminData).then((response) => {
                resolve(response.insertedId.toString())
            })
        })
    },
    getAllbrands: () => {
        return new Promise(async (resolve, reject) => {
            let brands = await db.get().collection(collection.BRAND_COLLECTION).find().toArray()
            resolve(brands)
            console.log(brands);
        })
    },
    deletebrands: (proID) => {
        return new Promise((resolve, reject) => {

            db.get().collection(collection.BRAND_COLLECTION).deleteOne({ _id: ObjectId(proID) }).then((response) => {
                console.log(ObjectId);
                resolve(response)
            })
        })
    },






    addcategory: (data) => {
        return new Promise(async (resolve, reject) => {

            let Cat = await db.get().collection(collection.CATEGORY_COLLECTION).findOne({ category: data.cname })

            if (Cat) {
                await db.get().collection(collection.CATEGORY_COLLECTION).updateOne({ category: data.cname }, { $push: { Scategory: data.sname } })

                resolve()
            } else {
                db.get().collection(collection.CATEGORY_COLLECTION).insertOne({ category: data.cname, Scategory: [data.sname] }).then((response) => {



                    resolve(response)
                })
            }
        })

    },





    getAllcategory: () => {
        return new Promise(async (resolve, reject) => {
            let category = await db.get().collection(collection.CATEGORY_COLLECTION).find().toArray()
            resolve(category)
            console.log(category);
        })
    },
    deletecategory: (catID) => {
        return new Promise((resolve, reject) => {

            db.get().collection(collection.CATEGORY_COLLECTION).deleteOne({ _id: ObjectId(catID) }).then((response) => {
                console.log(ObjectId);
                resolve(response)
            })
        })
    },
    addproduct: (adminData) => {

        return new Promise(async (resolve, reject) => {
            adminData.PPrice = parseInt(adminData.PPrice)
            db.get().collection(collection.PRODUCT_COLLECTION).insertOne(adminData).then((response) => {
                resolve(response.insertedId.toString())
            })
        })
    },
    getAllproducts: () => {
        return new Promise(async (resolve, reject) => {
            let products = await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)

        })
    },
    deleteproducts: (prID) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({ _id: ObjectId(prID) }).then((response) => {
                console.log(ObjectId);
                resolve(response)
            })
        })
    },
    getproductDetails: (prdtId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).findOne({ _id: ObjectId(prdtId) }).then((product) => {
                resolve(product)
            })
        })
    },
    updateproduct: (prdtId, productData) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION)
                .updateOne({ _id: ObjectId(prdtId) }, {
                    $set: {
                        name: productData.name,
                        cat: productData.cat,
                        brand: productData.brand,
                        pprice: productData.pprice,
                        color: productData.pid,
                        size: productData.size,
                        pstock: productData.pstock,
                        lcost: productData.lcost
                    }
                }).then((response) => {
                    resolve(response)
                    console.log("Response helper");
                    console.log(response);
                })
        })
    },
    getbrandDetails: (brandId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.BRAND_COLLECTION).findOne({ _id: ObjectId(brandId) }).then((brand) => {
                resolve(brand)
            })
        })
    },
    updatebrand: (brandId, brandData) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collection.BRAND_COLLECTION)
                .updateOne({ _id: ObjectId(brandId) }, {
                    $set: {
                        brand: brandData.brand,
                        description: brandData.description,

                    }
                }).then((response) => {
                    resolve(response)
                    console.log("Response helper");
                    console.log(response);
                })
        })
    },
    getcatDetails: (catId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.CATEGORY_COLLECTION).findOne({ _id: ObjectId(catId) }).then((catgy) => {
                resolve(catgy)
            })
        })
    },
    updatecat: (catId, catData) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collection.CATEGORY_COLLECTION)
                .updateOne({ _id: ObjectId(catId) }, {
                    $set: {
                        category: catData.cname,
                        Scategory: catData.sname,
                    }
                }).then((response) => {
                    resolve(response)

                })
        })
    },
    getAllUser: () => {
        return new Promise(async (resolve, reject) => {
            let users = await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(users)
        })
    },


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
    getUserdetails: (Id) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: objectId(Id) })
            if (user) {
                resolve(user)

            } else {

                resolve(false)
            }
        })
    },
    blockUser: (Id, userData) => {

        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(Id) },
                {
                    $set: {
                        status: false
                    }
                }).then((response) => {
                    resolve(response)

                })
        })
    },
    unblockUser: (Id, userData) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(Id) },
                {
                    $set: {
                        status: true
                    }
                }).then((response) => {
                    resolve(response)

                })
        })
    },
    getOrderProducts: (orderId) => {
        console.log(orderId);
        return new Promise(async (resolve, reject) => {
            let orderItem = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $match: {
                        _id: ObjectId(orderId)
                    }
                },
                {
                    $unwind: '$Products'
                },
                {
                    $project: {
                        item: '$Products.item',
                        qty: '$Products.qty'
                    }
                },
                {
                    $lookup: {
                        from: collection.PRODUCT_COLLECTION,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'Products'

                    }
                },
                {
                    $project: {
                        item: 1, qty: 1, product: { $arrayElemAt: ['$Products', 0] },



                    }

                }

            ]).toArray()

            resolve(orderItem)
        })
    },
    getAllOrders: () => {
        return new Promise(async (resolve, reject) => {
            let orders = await db.get().collection(collection.ORDER_COLLECTION).find().toArray()
            resolve(orders)
        })
    },
    // changeOrderStatus: (orderId, stat) => {

    //     return new Promise((resolve, reject) => {
    //         db.get().collection(collection.ORDER_COLLECTION).updateOne({ _id: ObjectId(orderId) }, {
    //             $set: {
    //                 Status: stat
    //             }
    //         }).then(() => {
    //             resolve()
    //         })
    //     })
    // },

    changeOrderStatus: (orderId, stat) => {
        return new Promise((resolve, reject) => {
            console.log(stat, "in change");
            if (stat == "Delivered") {
                db.get().collection(collection.ORDER_COLLECTION).updateOne({ _id: objectId(orderId) }, {
                    $set: {
                        Status: stat,
                        Delivered: true
                    }
                }).then(() => {
                    resolve()
                })
            } else if (stat == "Cancelled") {
                db.get().collection(collection.ORDER_COLLECTION).updateOne({ _id: objectId(orderId) }, {
                    $set: {
                        Status: stat,
                        Cancelled: true
                    }
                }).then(() => {
                    resolve()
                })
            } else {
                db.get().collection(collection.ORDER_COLLECTION).updateOne({ _id: objectId(orderId) }, {
                    $set: {
                        Status: stat
                    }
                }).then(() => {
                    resolve()
                })
            }
        })
    },

    getallbanner: () => {
        return new Promise(async (resolve, reject) => {
            let banners = await db.get().collection(collection.BANNER_COLLECTION).find().toArray()
            resolve(banners)

        })

    },
    addbanner: (adminData) => {
        return new Promise(async (resolve, reject) => {

            db.get().collection(collection.BANNER_COLLECTION).insertOne(adminData).then((response) => {
                resolve(response.insertedId.toString())
            })
        })
    },
    getbannerDetails: (bannerId) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.BANNER_COLLECTION).findOne({ _id: ObjectId(bannerId) }).then((banner) => {
                resolve(banner)

            })
        })
    },
    updatebanner: (bannerId, bannerData) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(collection.BANNER_COLLECTION)
                .updateOne({ _id: ObjectId(bannerId) }, {
                    $set: {
                        name: bannerData.banner,
                        description: bannerData.description,
                        title1: bannerData.title1,
                        title2: bannerData.title2,
                        title3: bannerData.title3,
                        link: bannerData.link

                    }
                }).then((response) => {
                    resolve(response)

                })
        })
    },
    deletebanner: (bannerID) => {
        return new Promise((resolve, reject) => {

            db.get().collection(collection.BANNER_COLLECTION).deleteOne({ _id: ObjectId(bannerID) }).then((response) => {

                resolve(response)
            })
        })
    },
    // admin  dashboard
    latestProduct: () => {
        return new Promise(async (resolve, reject) => {
            let latestProduct = await db.get().collection(collection.PRODUCT_COLLECTION).find().sort({ $natural: -1 }).limit(5).toArray()

            resolve(latestProduct)
        })
    },
    // orders
    latestorders: () => {
        return new Promise(async (resolve, reject) => {
            let latestorders = await db.get().collection(collection.ORDER_COLLECTION).find().sort({ $natural: -1 }).limit(5).toArray()

            resolve(latestorders)
        })
    },
    getUserCount: () => {

        return new Promise(async (resolve, reject) => {
            let UCount = await db.get().collection(collection.USER_COLLECTION).count()

            resolve(UCount)


        })
    },
    getProductCount: () => {
        return new Promise(async (resolve, reject) => {
            let Pcount = await db.get().collection(collection.PRODUCT_COLLECTION).count()
            resolve(Pcount)
        })

    },
    

    getProfite: () => {
        return new Promise(async (resolve, reject) => {
            let newTotal=0
            let total = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $match: {
                        Status: 'Delivered'
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$Total' }
                    }
                }
            ]).toArray()
            if(total[0]){
                console.log(total)
                resolve(total[0].total)             
            }else{
                resolve(newTotal)
            }            
        })
    },

    AllMethods: () => {
        let Methods = []
        return new Promise(async (resolve, reject) => {
            let CodProduct = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $match: {
                        PaymentMethod: 'COD'
                    }
                }
            ]).toArray()
            let CODlen = CodProduct.length
            Methods.push(CODlen)


            let PaypalProduct = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $match: {
                        PaymentMethod: 'paypal'
                    }
                }
            ]).toArray()
            let PayPallen = PaypalProduct.length
            Methods.push(PayPallen)


            let RazorpayProduct = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $match: {
                        PaymentMethod:
                            "Razorpay"

                    }
                }
            ]).toArray()
            let Razorpaylen = RazorpayProduct.length
            Methods.push(Razorpaylen)

            resolve(Methods)






        })
    },
    OrderStatus: () => {

        let status = []
        return new Promise(async (resolve, reject) => {
            let Pending = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $match: {
                        Status: 'Pending'
                    }
                }
            ]).toArray()
            let Pendinglen = Pending.length
            status.push(Pendinglen)


            let Placed = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $match: {
                        Status: 'placed'
                    }
                }
            ]).toArray()
            let Placedlen = Placed.length
            status.push(Placedlen)


            let Shipped = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $match: {
                        Status: 'Shipped'
                    }
                }
            ]).toArray()
            let Shippedlen = Shipped.length
            status.push(Shippedlen)



            let Delivered = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $match: {
                        Status: 'Delivered'
                    }
                }
            ]).toArray()
            let Deliveredlen = Delivered.length
            status.push(Deliveredlen)


            let Cancelled = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $match: {
                        Status: 'Cancelled'
                    }
                }
            ]).toArray()
            let Cancelledlen = Cancelled.length
            status.push(Cancelledlen)

            resolve(status)






        })

    },
    topSellingProducts: () => {
        return new Promise(async (resolve, reject) => {

            let data = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $unwind: "$products"
                },

                {
                    $match: { 'products.Status': 'Delivered' }

                },
                {
                    $project: {
                        item: "$products.item",

                    }
                },

                {
                    $group: {
                        _id: "$item",
                        count: { $sum: 1 }
                    }
                },
                {
                    $lookup: {
                        from: collection.PRODUCT_COLLECTION,
                        localField: '_id',
                        foreignField: '_id',
                        as: 'productdetail'

                    }
                },
                {
                    $project: {
                        count: 1, productdetail: { $arrayElemAt: ['$productdetail', 0] }
                    }
                },
                {
                    $sort: { count: -1 }
                },
                {
                    $limit: 8
                }




            ]).toArray();


            resolve(data)


        })
    },
    addProductOffer: (data) => {
        return new Promise(async (resolve, reject) => {
            let product = await db.get().collection(collection.PRODUCT_COLLECTION).findOne({ name: data.Product })


            data.Offer = parseInt(data.Offer)
            let actualPrice = product.PPrice
            let newPrice = (((product.PPrice) * (data.Offer)) / 100)
            newPrice = newPrice.toFixed()

            db.get().collection(collection.PRODUCT_OFFERS).insertOne(data).then((response) => {
                db.get().collection(collection.PRODUCT_COLLECTION).updateOne({ name: data.Product },
                    {
                        $set: {
                            proOffer: true,
                            proPercentage: data.Offer,
                            PPrice: (actualPrice - newPrice),
                            actualPrice: actualPrice
                        }
                    }).then(() => {
                        resolve()
                    })
            })
        })
    },
    getAllProOffers: () => {
        return new Promise(async (resolve, reject) => {
            let pOffer = await db.get().collection(collection.PRODUCT_OFFERS).find().toArray()
            resolve(pOffer)
        })
    },
    getProOffersDetails: (id) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_OFFERS).findOne({ _id: ObjectId(id) }).then((proOffer) => {
                resolve(proOffer)


            })
        })
    },
    updateProOffer: (id, newData) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_OFFERS).updateOne({ _id: objectId(id) },
                {
                    $set: {
                        Product: newData.Product,
                        Starting: newData.Starting,
                        Expiry: newData.Expiry,
                        Offer: newData.Offer
                    }
                }).then((response) => {
                    resolve(response)
                }).catch((err) => {
                    console.log(err);
                    reject(err)
                })
        })
    },
    deleteProOffer: (id) => {
        return new Promise(async (resolve, reject) => {
            let productOffer = await db.get().collection(collection.PRODUCT_OFFERS).findOne({ _id: objectId(id) })
            let pname = productOffer.Product
            let product = await db.get().collection(collection.PRODUCT_COLLECTION).findOne({ name: pname })
            db.get().collection(collection.PRODUCT_OFFERS).deleteOne({ _id: objectId(id) }).then(() => {
                db.get().collection(collection.PRODUCT_COLLECTION).updateOne({ name: pname },
                    {
                        $set: {
                            price: product.actualPrice
                        },
                        $unset: {
                            proOffer: "",
                            proPercentage: "",
                            actualPrice: ""
                        }
                    }).then(() => {
                        resolve()
                    })
            })
        })
    },


    // coupon offer

    // addcoupon: (data) => {
    //     return new Promise(async (resolve, reject) => {
    //         Object
    //         CouponCode

    //         StartDate

    //         expirydate

    //         discount


    //         await db.get().collection(collection.COUPON_OFFERS).insertOne({ data })


    //     })
    // },
    addcoupon: (data) => {
        return new Promise(async (resolve, reject) => {
            let expirydate = moment(data.expirydate).format('DD/MM/YYYY')
            let StartDate = moment(data.StartDate).format('DD/MM/YYYY')
            let dataobj = {
                CouponCode: data.CouponCode,
                discount: parseInt(data.discount),
                Status: 1,
                StartDate: StartDate,
                expirydate: expirydate,
                Users: []

            }
            db.get().collection(collection.COUPON_OFFERS).insertOne(dataobj).then(() => {
                resolve()
            }).catch((err) => {
                reject(err)
            })
        })
    },
    getAllcoupons: () => {
        return new Promise(async (resolve, reject) => {
            let coupon = await db.get().collection(collection.COUPON_OFFERS).find().toArray()
            console.log(coupon, "your list");
            resolve(coupon)
        })
    },
    getCouponDetails: (cId) => {
        return new Promise(async (resolve, reject) => {
            let coupon = await db.get().collection(collection.COUPON_OFFERS).findOne({ _id: ObjectId(cId) })
            resolve(coupon)
        })
    },
    updatecoupon: (id, newData) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.COUPON_OFFERS).updateOne({ _id: ObjectId(id) },
                {
                    $set: {
                        CouponCode: newData.CouponCode,
                        StartDate: newData.StartDate,
                        expirydate: newData.expirydate,
                        discount: newData.discount
                    }
                }).then((response) => {
                    resolve(response)

                    console.log(response, "your coupon response");
                }).catch((err) => {
                    console.log(err);
                    reject(err)
                })
        })
    },

    deleteCoupon: (id) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.COUPON_OFFERS).deleteOne({ _id: ObjectId(id) }).then(() => {
                resolve()
            })
        })
    },



    // CATEGORY OFFERS

    getAllCatOffers: () => {
        return new Promise(async (resolve, reject) => {
            let cOffer = await db.get().collection(collection.CATEGORY_OFFERS).find().toArray()
            resolve(cOffer)
        })
    },
    getCatOfferDetails: (id) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.CATEGORY_OFFERS).findOne({ _id: ObjectId(id) }).then((banner) => {
                resolve(banner)
                console.log(banner, "))))))))))))))");
            })
        })
    },
    updateCatOffer: (id, newData) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.CATEGORY_OFFERS).updateOne({ _id: objectId(id) },
                {
                    $set: {
                        Category: newData.Category,
                        Starting: newData.Starting,
                        Expiry: newData.Expiry,
                        Offer: newData.Offer
                    }
                }).then((response) => {
                    resolve(response)
                }).catch((err) => {
                    console.log(err);
                    reject(err)
                })
        })
    },
    deleteCatOffer: (id) => {
        return new Promise(async (resolve, reject) => {
            let categoryOffer = await db.get().collection(collection.CATEGORY_OFFERS).findOne({ _id: ObjectId(id) })
            let cname = categoryOffer.Category
            let product = await db.get().collection(collection.PRODUCT_COLLECTION).findOne({ category: cname })
            if (product) {
                console.log("you hear");
                db.get().collection(collection.CATEGORY_OFFERS).deleteOne({ _id: ObjectId(id) }).then(() => {
                    db.get().collection(collection.PRODUCT_COLLECTION).updateOne({ category: cname },
                        {
                            $set: {
                                price: product.actualPrice
                            },
                            $unset: {
                                catOffer: "",
                                catPercentage: "",

                                actualPrice: ""
                            }
                        }).then(() => {
                            resolve()
                        })
                })
            } else {
                resolve()
            }
        })
    },


    addCategoryOffer: (data) => {
        let cname = data.Category
        data.Offer = parseInt(data.Offer)
        return new Promise(async (resolve, reject) => {


            db.get().collection(collection.CATEGORY_OFFERS).insertOne(data).then(async () => {
                let products = await db.get().collection(collection.PRODUCT_COLLECTION).find({ category: data.Category, catOffer: { $exists: false } }).toArray()
                console.log(products);
                await products.map(async (product) => {
                    let actualPrice = product.price
                    let newPrice = (((product.price) * (data.Offer)) / 100)
                    newPrice = newPrice.toFixed()

                    db.get().collection(collection.PRODUCT_COLLECTION).updateOne({ _id: ObjectId(product._id) },
                        {
                            $set: {
                                actualPrice: actualPrice,
                                price: (actualPrice - newPrice),
                                catoffer: true,
                                catPercentage: data.Offer
                            }
                        }).then((data) => {
                            resolve(data)
                            console.log(data, "yout cat offer");
                        })
                })


            }).catch((err) => {
                reject(err)
            })
        })
    },


    //sales report



    salesreport: () => {
        return new Promise(async (resolve, reject) => {
            let sale = await db.get().collection(collection.ORDER_COLLECTION).aggregate([

                // {
                //     $match: {
                //         Date: {
                //             $gte: StartDate,
                //             $lte: expirydate

                //         }
                //     }
                // },
                {
                    $unwind: "$Products"
                },
                {
                    $project: {
                        Date: 1,
                        products: "$Products.item",
                        status: 1,
                        qty: "$Products.quantity",
                        Total: 1,


                    }
                },
                {
                    $group: {

                        _id: "$Date",
                        ProdCount: { $sum: "$qty" },
                        Revenue: { $sum: "$Total" }

                    }
                },
                {
                    $sort: { _id: 1 }
                }

            ]).toArray()
            console.log(sale, "your sale");
            resolve(sale)
        })
    },


    allProductDetails: () => {
        console.log("!!!!!1111");
        return new Promise(async (resolve, reject) => {
            let result = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $unwind: "$Products"
                },
                {
                    $group: {
                        _id: "$User",
                        totalOrders: { "$sum": 1 },
                        spend: { "$sum": "$Total" },
                        productsbuy: { "$sum": "$Products.quantity" }
                    }
                },
                {
                    $lookup: {
                        from: collection.USER_COLLECTION,
                        localField: "_id",
                        foreignField: "_id",
                        as: "userData"
                    }
                },
     
                {
                    $project: {
                        _id: 1,
                        totalOrders: 1,
                        spend: 1,
                        productsbuy: 1,
                      
                        userdetails: { $arrayElemAt: ['$userData', 0] }
                    }
                }
    
    
    
            ]).toArray();
            console.log(result);
            resolve(result);
        })
    },
    


    getSales:(data)=>{
        let StartDate=moment(data.StartDate).format('YYYY/MM/DD')
        let EndDate=moment(data.EndDate).format('YYYY/MM/DD')
        return new Promise(async(resolve,reject)=>{
           SaleData=await db.get().collection(collection.ORDER_COLLECTION).find({Date:{$gte:StartDate,$lte:EndDate}}).toArray()
           resolve(SaleData)
        })
    },
    

}



