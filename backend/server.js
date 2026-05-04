import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import triageRoutes from './routes/triageRoutes.js'
import facilityRoutes from './routes/facilityRoutes.js'
import symptomsRoutes from './routes/symptomsRoutes.js'

dotenv.config()

const app=express()

app.use(cors())

app.use(express.json())

app.use('/api/triage',triageRoutes)
app.use('/api/facilities',facilityRoutes)
app.use('/api/symptoms',symptomsRoutes)

const PORT=process.env.PORT || 5000
connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log(`server running on http://localhost:5000`);
    
  })
})

