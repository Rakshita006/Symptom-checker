import mongoose from "mongoose";

const triageSchema=new mongoose.Schema({
  symptoms:[{
    type:mongoose.Schema.Types.ObjectId, ref:'Symptoms' 
  }],
  age:{type:String, enum:['child','adult','elderly'] ,required:true},
  days:{type:Number, required:true},
  pain_level:{type:String, enum:['low','medium','high'],required:true},
  condition:[
    {
      type:mongoose.Schema.Types.ObjectId, ref:'Condition'
    }
  ],
  care_level:{type:String,enum:['home','clinic','hospital'], required:true},
  sms_sent:{type:Boolean,default:false},
  
},{timestamps:true})

export default mongoose.model('TriageSession', triageSchema)