import Symptoms from "../models/Symptoms.js"

export const getSymptoms=async(req,res)=>{
  try {
    const symptoms=await Symptoms.find()

    if(!symptoms) return res.status(400).json({message:'error fetching symptoms'})

      res.status(200).json(symptoms)
  } catch (error) {
    res.status(500).json({message:'some error occured while fetching symptoms'})
  }
}