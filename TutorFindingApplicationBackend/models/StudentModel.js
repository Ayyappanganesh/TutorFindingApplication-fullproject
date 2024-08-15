const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const StudentSchema = new mongoose.Schema({
    profilepic:{
        type:String,
        default:'https://res.cloudinary.com/diokpb3jz/image/upload/v1722887830/samples/s8yfrhetwq1s4ytzwo39.png'
    },
    name:{
        type:String,
        required:[true,'Please provide name'],
    },
    email:{
        type:String,
        required:[true,'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please provide password'],
        minLength:6
    },
    likedReviews:{
        type:[mongoose.Types.ObjectId],
        ref:'Review',
        default:[]
    },
    dislikedReviews:{
        type:[mongoose.Types.ObjectId],
        ref:'Review',
        default:[]
    },
    favouriteTutions:{
        type:[mongoose.Types.ObjectId],
        ref:'Tution',
        default:[]
    }
})
// StudentSchema.virtual('reviews',{
//     ref:'Review',
//     localField:'_id',
//     foreignField:'createdBy',
//     justOne:false
//  })
 
 StudentSchema.pre('deleteOne',async function(next){
    console.log("Executing before delete One");
 
     const conditions = this.getQuery();
 
    // conditions =  { _id: new ObjectId('66ae0849353608962239c7f9') }
 
     const doc = await mongoose.model('Student').findOne(conditions);
 
     //doc contains the document to be deleted
     
     //Here we pass the id of the teacher to get deleted at Review Model
    await mongoose.model('Review').deleteMany({createdBy:doc._id})
 })

 StudentSchema.pre('save', async function(){
    if(!this.isModified('password'))
       return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})

StudentSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password)

    return isMatch
}

module.exports = mongoose.model('Student',StudentSchema)