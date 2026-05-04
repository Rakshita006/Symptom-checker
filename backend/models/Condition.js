import mongoose, { Schema } from "mongoose";


const conditionSchema=new mongoose.Schema({
  weight_symptoms: [
    {
      symptom_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Symptoms' },
      weight: { type: Number }
    }
  ],
  probable_illness:{type:String, required:true},
  illness_severity:{type:String,enum:['home','clinic','hospital'] ,required:true},
  first_aid:{type:String, required:true},
})

export default mongoose.model('Condition',conditionSchema)