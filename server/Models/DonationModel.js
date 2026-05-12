import {Schema,model} from 'mongoose';
const DonationSchema=new Schema({
    Donor:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:[true]
    },
    Campaign:{
        type:Schema.Types.ObjectId,
        ref:'Campaign',
        required:[true]
    },
    Amount:{
        type:Number,
        required:[true]
    },
    Status:{
        enum:["Success","Failed","Pending"],
        default:"Pending",
        type:String
    }
},{
    timestamps:true,
    strict:"throw"
})
const DonationModel=model('Donation',DonationSchema);
export default DonationModel;
