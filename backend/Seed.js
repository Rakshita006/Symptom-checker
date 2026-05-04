import mongoose from "mongoose";
import Symptom from "./models/Symptoms.js";
import Condition from "./models/Condition.js";

const MONGO_URI = "mongodb+srv://root:root@complete.xbknock.mongodb.net";

const seedDB = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  await Symptom.deleteMany({});
  await Condition.deleteMany({});
  console.log("Cleared existing data");

  const symptoms = await Symptom.insertMany([
    { name: "Chest pain",        description: "Pain or pressure in the chest area",      body_region: "chest"  },
    { name: "Shortness of breath",description: "Difficulty breathing or catching breath", body_region: "chest"  },
    { name: "Fever",             description: "Body temperature above 38°C",              body_region: "general"},
    { name: "Fatigue",           description: "Extreme tiredness or lack of energy",      body_region: "general"},
    { name: "Runny nose",        description: "Excess nasal discharge",                   body_region: "head"   },
    { name: "Sore throat",       description: "Pain or irritation in the throat",         body_region: "head"   },
    { name: "Rapid heartbeat",   description: "Heart beating unusually fast",             body_region: "chest"  },
    { name: "Nausea",            description: "Feeling of wanting to vomit",              body_region: "stomach"},
    { name: "Left arm pain",     description: "Pain radiating down the left arm",         body_region: "limbs"  },
    { name: "Dizziness",         description: "Feeling lightheaded or unsteady",          body_region: "head"   },
  ]);

  console.log(`Inserted ${symptoms.length} symptoms`);

  const s = {};
  symptoms.forEach(sym => { s[sym.name] = sym._id; });

  await Condition.insertMany([
    {
      probable_illness: "Common cold",
      illness_severity: "home",
      first_aid: "Rest, stay hydrated, take over-the-counter cold medicine. See a doctor if symptoms persist beyond 10 days.",
      weight_symptoms: [
        { symptom_id: s["Runny nose"],   weight: 5 },
        { symptom_id: s["Sore throat"],  weight: 4 },
        { symptom_id: s["Fever"],        weight: 2 },
        { symptom_id: s["Fatigue"],      weight: 2 },
      ],
    },
    {
      probable_illness: "Heart attack",
      illness_severity: "hospital",
      first_aid: "Call emergency services immediately. Have the person sit or lie down. If available, give aspirin. Do not leave them alone.",
      weight_symptoms: [
        { symptom_id: s["Chest pain"],          weight: 5 },
        { symptom_id: s["Left arm pain"],        weight: 5 },
        { symptom_id: s["Shortness of breath"],  weight: 4 },
        { symptom_id: s["Rapid heartbeat"],      weight: 3 },
        { symptom_id: s["Nausea"],               weight: 2 },
        { symptom_id: s["Dizziness"],            weight: 2 },
      ],
    },
    {
      probable_illness: "Anxiety attack",
      illness_severity: "clinic",
      first_aid: "Move to a quiet space. Practice slow deep breathing — inhale for 4 counts, hold for 4, exhale for 4. If attacks are recurring, consult a doctor.",
      weight_symptoms: [
        { symptom_id: s["Rapid heartbeat"],      weight: 5 },
        { symptom_id: s["Shortness of breath"],  weight: 4 },
        { symptom_id: s["Chest pain"],           weight: 3 },
        { symptom_id: s["Dizziness"],            weight: 3 },
        { symptom_id: s["Nausea"],               weight: 2 },
      ],
    },
    {
      probable_illness: "Influenza (flu)",
      illness_severity: "clinic",
      first_aid: "Rest and drink plenty of fluids. Take fever-reducing medication. See a doctor if fever exceeds 39.5°C or symptoms worsen after 5 days.",
      weight_symptoms: [
        { symptom_id: s["Fever"],               weight: 5 },
        { symptom_id: s["Fatigue"],             weight: 5 },
        { symptom_id: s["Sore throat"],         weight: 3 },
        { symptom_id: s["Runny nose"],          weight: 2 },
        { symptom_id: s["Shortness of breath"], weight: 2 },
      ],
    },
  ]);

  console.log("Inserted 4 conditions");
  console.log("Seeding complete");
  await mongoose.disconnect();
};

seedDB().catch(err => {
  console.error("Seeding failed:", err);
  mongoose.disconnect();
});