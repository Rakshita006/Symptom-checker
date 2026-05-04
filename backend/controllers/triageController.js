import Condition from "../models/Condition.js"

export const postTriage=async(req,res)=>{
  try {
    const {selectedSymptoms}=req.body 
    const conditions=await Condition.find()

    const totscores=(conditions, selectedSymptoms)=>{
      return conditions.map(condition=>{
        let score=0;

          condition.weight_symptoms.forEach(weightObj=>{
            if(selectedSymptoms?.includes(weightObj.symptom_id.toString())){
              score+=weightObj.weight
            }
          })
          return {condition,score}
      })
    }

    const scoredConditions=totscores( conditions, selectedSymptoms)

    scoredConditions.sort((a,b)=>b.score-a.score)

    const ans=scoredConditions.map((scoredCondition)=>({
      
      probable_illness:scoredCondition.condition.probable_illness,
      illness_severity:scoredCondition.condition.illness_severity,
      first_aid:scoredCondition.condition.first_aid,
      score:scoredCondition.score
    
    }))

    res.json(ans)
  } catch (error) {
    console.log('error tryage',error);
    
    res.status(500).json({message:'could not calculate scores'})
  }
}