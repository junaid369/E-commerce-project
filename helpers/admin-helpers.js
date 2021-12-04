






var db = require('../config/connection')
var collection = require('../config/collection')
const bcrypt = require('bcrypt')
const objectId = require('mongodb').ObjectID
const { ObjectId } = require('bson')
const { response } = require('../app')



module.exports = {
    doAdminLogin: (adminData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let responseAdmin = {}
            let admin = await db.get().collection(collection.ADMIN_COLLECTTION).findOne({ email: adminData.email })
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
            // console.log(proID);
            // console.log(objectId(adminData));
            db.get().collection(collection.BRAND_COLLECTION).deleteOne({ _id: ObjectId(proID) }).then((response) => {
                console.log(ObjectId);
                resolve(response)
            })
        })
    },

    addcategory: (adminData) => {
        return new Promise(async (resolve, reject) => {


            let cat = await db.get().collection(collection.CATEGORY_COLLECTION).findOne({ categories: adminData.cname })
            if (cat) {

                // await db.get().collection(collection.CATEGORY_COLLECTION).updateOne({categories:adminData.cname},{$push:{scategory:adminData.sname}})
                await db.get().collection(collection.CATEGORY_COLLECTION).updateOne({ categories: adminData.cname }).then((response) => {

                })
                resolve()
            }
            else {
                await db.get().collection(collection.CATEGORY_COLLECTION).insertOne({ categories: adminData.cname }).then((response) => {


                    console.log(response);


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
            // console.log(proID);
            // console.log(objectId(adminData));
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
                        //  pid:productData.pid,
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
                        categories: catData.cname,
                        scategory: catData.sname,
                    }
                }).then((response) => {
                    resolve(response)
                    console.log("Response helper");
                    console.log(response);
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
            console.log("it sreal");
            console.log(blockedUsers, "hy 777777777777777777777");
        })

    },
    getUserdetails: (Id) => {
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: objectId(Id) })
            if (user) {
                resolve(user)

            } else {
                console.log("else");
                resolve(false)
            }
        })
    },
    blockUser: (Id, userData) => {
        console.log("hy are you still al ive");
        return new Promise((resolve, reject) => {
            db.get().collection(collection.USER_COLLECTION).updateOne({ _id: ObjectId(Id) },
                {
                    $set: {
                        status: false
                    }
                }).then((response) => {
                    resolve(response)
                    console.log(response, "reskhgfyufiuy");
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
                    console.log(response, "res");
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
                        // subtotal: { $multiply: [{ $arrayElemAt: ["$product.Price", 0] }, "$qty"] }


                    }

                }

            ]).toArray()
            console.log(orderItem, "0");
            resolve(orderItem)
        })
    },
    getAllOrders: () => {
        return new Promise(async (resolve, reject) => {
            let orders = await db.get().collection(collection.ORDER_COLLECTION).find().toArray()
            resolve(orders)
        })
    },
    changeOrderStatus: (orderId, stat) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.ORDER_COLLECTION).updateOne({ _id: ObjectId(orderId) }, {
                $set: {
                    Status: stat
                }
            }).then(() => {
                resolve()
            })
        })
    },

    getallbanner: () => {
        return new Promise(async (resolve, reject) => {
            let banners = await db.get().collection(collection.BANNER_COLLECTION).find().toArray()
            resolve(banners)
            console.log(banners);
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
                console.log(banner, "00000000000");
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
                    console.log("Response helper");
                    console.log(response);
                })
        })
    },
    deletebanner: (bannerID) => {
        return new Promise((resolve, reject) => {
            // console.log(proID);
            // console.log(objectId(adminData));
            db.get().collection(collection.BANNER_COLLECTION).deleteOne({ _id: ObjectId(bannerID) }).then((response) => {
                console.log(ObjectId);
                resolve(response)
            })
        })
    },
    // admin ash board
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
    // getProfite:()=>{
    //     return new Promise(async(resolve,reject)=>{
    //         let total=await db.get().collection(collection.ORDER_COLLECTION).aggregate([
    //             {
    //                 $match: {
    //                    Status:'Delivered'
    //                 }
    //             },
    //             {
    //                 $group:{
    //                     _id:null,
    //                     total:{$sum:'$Total'}
    //                 }
    //             }
    //         ]).toArray()

    //         resolve(total[0].total)
    //     })
    // },

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
            console.log(CODlen, "))))))))))");

            let PaypalProduct = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $match: {
                        PaymentMethod: 'paypal'
                    }
                }
            ]).toArray()
            let PayPallen = PaypalProduct.length
            Methods.push(PayPallen)
            console.log(PayPallen, "paypal");

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
            console.log(Methods, ">>>>>>>>>");





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
            console.log(Pendinglen, "ab");

            let Placed = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $match: {
                        Status: 'Placed'
                    }
                }
            ]).toArray()
            let Placedlen = Placed.length
            status.push(Placedlen)
            console.log(Placedlen, "bc");

            let Shipped = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $match: {
                        Status: 'Shipped'
                    }
                }
            ]).toArray()
            let Shippedlen = Shipped.length
            status.push(Shippedlen)
            console.log(Shippedlen, "ed");


            let Delivered = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
                {
                    $match: {
                        Status: 'Delivered'
                    }
                }
            ]).toArray()
            let Deliveredlen = Delivered.length
            status.push(Deliveredlen)
            console.log(Deliveredlen, "mk");

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
            console.log(status, "po");





        })

    },
    topSellingProducts:()=>{
        return new Promise(async(resolve,reject)=>{
   
     let data = await db.get().collection(collection.ORDER_COLLECTION).aggregate([
       {
           $unwind:"$products"
          },
   
          {
           $match:{'products.Status':'Delivered'}
   
       },
       {
           $project:{
              item:"$products.item",
       
           }
         },

         {
             $group:{
                 _id:"$item",
                 count:{$sum:1}
             }
         },
        {
            $lookup:{
                from: collection.PRODUCT_COLLECTION,
                localField:'_id',
                foreignField:'_id',
           as:'productdetail'
          
                   }
            },
            {
                $project:{
                    count:1,productdetail:{$arrayElemAt:['$productdetail',0]}
                }
            },
            {
               $sort:{count:-1}
           },
           {
               $limit:8
           }
      
   
     
   
      ]).toArray();
     
    
   resolve(data)
   console.log(data,"your top products");
   
        })
    },
}

