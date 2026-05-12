import {Schema,model} from 'mongoose';
const UserSchema=new Schema({
    FirstName:{
        type:String,
        required:[true]
    },
    LastName:{
        type:String,
        required:[true]
    },
    Email:{
        type:String,
        required:[true],
        unique:true
    },
    Password:{  
        type:String,
        required:[true]
    },  
    PhoneNumber:{
        type:String,
        required:[true]
    },
    Role:{
        enum:['admin','user'],
        type:String,
        default:'user'
    },
    IsActive:{
        type:Boolean,
        default:true
    },
    Campaigns:[
        {
            type:Schema.Types.ObjectId,
            ref:'Campaign'
        }
    ]
},
{
    timestamps:true,
    strict:"throw"
})
const UserModel=model('User',UserSchema);
export default UserModel;