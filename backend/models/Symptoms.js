import mongoose from "mongoose";

const symptomsSchema=new mongoose.Schema({
  name:{type:String, required:true},
  description:{type:String},
  body_region:{type:String, enum:['head','chest','limbs','back','skin','stomach','general'], required:true},
  
})

export default mongoose.model('Symptoms',symptomsSchema)