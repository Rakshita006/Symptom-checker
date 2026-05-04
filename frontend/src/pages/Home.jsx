import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSymptoms, postTriage } from '../../Api/Api.js'
import toast from 'react-hot-toast'

const Home = () => {
  const navigate=useNavigate()
  const [symptoms,setSymptoms]=useState([])
  const [selected, setSelected]=useState([])

  const [form, setForm]=useState({
      age_group:'',
      days:'',
      pain_level:''
    })
  
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }
  
    const handleSubmit=async(e)=>{
      e.preventDefault()
      try {
        if(selected.length===0 || !form.age_group || !form.days || !form.pain_level){
          return toast.error('select your symptoms and fill the form details')
        }

        const res=await postTriage({selectedSymptoms:selected,...form})
        console.log('triage response:', res.data)
        navigate('/results',{state:{triageData:res.data}})
      } catch (error) {
        toast.error('could not submit the triageData')
      }
    }

  const fetchSymptoms=async()=>{
    try {
      const res=await getSymptoms()
      setSymptoms(res.data)
      toast.success('fetches symptoms')
    } catch (error) {
      toast.error('error fetching symptoms')
    }
  }

  const handleSymptomToggle = (id) => {
  if(selected.includes(id)){
    setSelected(selected.filter(select => select !== id))
  } else {
    setSelected([...selected, id])
  }
}
  useEffect(()=>{
    fetchSymptoms()
  },[])
  return (
    <>
    <div className='m-16 flex items-center justify-center flex-col'>
       { symptoms.map((symptom)=>(
      <div key={symptom._id} className={`flex items-center justify-center border w-2xl gap-3 rounded-lg p-4 cursor-pointer
       bg-[#252540] hover:bg-gray-500 text-white font-medium 
       ${selected.includes(symptom._id)?'bg-gray-600':'bg-gray-550'}`} onClick={()=>handleSymptomToggle(symptom._id)}>
  <p>{symptom.name}</p>
</div>

    ))}
    
<div className='mt-10 flex flex-col justify-between items-center border border-cyan-200 border-rounded p-6 rounded-sm'>
  <p className='text-2xl'>Fill this form</p>
    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
      <div className='flex flex-col gap-1 w-full mb-4'>
        <label className='text-gray-300 text-sm font-medium mb-1'>Age group</label>
      <select name="age_group" value={form.age_group} onChange={handleChange}
      className='bg-[#252540] text-white border border-gray-600 rounded-lg p-3 w-full'>
        <option value="">Select...</option>
        <option value="child">Child</option>
        <option value="adult">Adult</option>
        <option value="elderly">Elderly</option>
      </select>
      </div>
      
    <div className='flex flex-col gap-1 w-full mb-4'>
      <label className='text-gray-300 text-sm font-medium mb-1'>Days</label>
      <input type="text" 
      name='days'
      value={form.days}
      onChange={handleChange}
      className='bg-[#252540] text-white border border-gray-600 rounded-lg p-3 w-full'
      />

    </div>

    <div className='flex flex-col gap-1 w-full mb-4'>
        <label className='text-gray-300 text-sm font-medium mb-1'>Pain Level</label>
      <select name="pain_level" value={form.pain_level} onChange={handleChange} 
      className='bg-[#252540] text-white border border-gray-600 rounded-lg p-3 w-full'>
        <option value="">Select...</option>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
    </div>

      <button className='bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-8 rounded-lg' type='submit'>Submit</button>
    </form>
    </div>
    </div>
    </>
  )

}

export default Home