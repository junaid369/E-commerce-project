const mongoClient = require('mongodb').MongoClient
const state={
    db:null
}
module.exports.connect= function (done){
    const url='mongodb+srv://junaid:1q2w3e@lafemme.ljr4k.mongodb.net/lafemme?retryWrites=true&w=majority'
    const dbname='lafemme'

    mongoClient.connect(url,(err,data)=>{
        if(err)
        return done(err)
        state.db=data.db(dbname)
        done()
    })
    
}

module.exports.get=function(){
    return state.db
}