const mongoose=require('mongoose');
const mongoURI="mongodb+srv://Jenil176:Jenil%4053645@cluster0.eluqlx3.mongodb.net/";
mongoose.set('strictQuery', true);
const connectToMongo=()=>{
    mongoose.connect(mongoURI,{dbName:'iNoteBook'}).then(()=>{
      console.log('Mongodb connected successfully');
    }).catch((error )=>console.log(error.message))

    mongoose.connection.on('connected',()=>{
      console.log('Mongoose connected to db')
    })

    mongoose.connection.on('error',(error)=>{
      console.log(error.message)
    })

    mongoose.connection.on('disconnected',()=>{
      console.log('Mongoose connection is disconnected')
    })
}

module.exports=connectToMongo; 