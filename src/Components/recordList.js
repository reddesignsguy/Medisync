import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import MucinexImage from "../images/Mucinex.png";
import img2 from "../images/Mucinex.png";
import img3 from "../images.js";
import images from "../images.js"
// let img_url = "../images/medications";

// const images = {
//     "Mucinex" : MucinexImage
// };
const Record = (props) =>  {
  
  // var record_image_url = img_url + props.record.medication + ".png";
  // console.log(record_image_url);
  return (
    <div>
    <img src = {images[props.record.medication]} alt= {props.record.medication}></img>
    </div>

);
  }
 
// Returns function that lists out an array vertically
function listArray(array) {
  return array.map((symptom) => {return <div> {symptom} </div>})
};

export default function RecordList(props) {
 const [records, setRecords] = useState([]);

 const[symptom, setSymptom] = useState(props.symptom)
 const[details, setDetails] = useState(props.medication)
 const[frequency, setFrequency] = useState(props.medication)


 // This method fetches the records from the database any time the length of records is increased
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5000/record/`);       // use predefined express route to get record (check server.routes.record.js to see exact query)
     
     // this is our record database

     // error happened
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

     const records = await response.json();             // Result (gets all medicine in database)

     // Filters out result with entry
     const view = records.filter(function(entry) {     

      return entry.symptoms.includes(symptom)   
     })   // View: Filters out database

     setRecords(view);                               // Update displayed records
   }
 
   getRecords();                                        // Wait for another possible change in the DB
 
   return;
 }, [records.length]);
 
 
 // This method will map out the records on the table
 const List = () => {
  console.log(records);
   return records.map((record) => {
     return (
        <Record
          record={record}
          key={record._id}
        />
     );
   });
 }

 // This method will list the description of the records on the table
 const Description = () => {

    // We grab only the first record's description because
    if (records.length > 0) {
      return (
        <div>
        <p>  {records[0].description} </p>
        </div>
      );
    }

 }

  // Displays the record list (front end)
   return (
     <div>
      <h3>Medication Recommendation</h3>
      <div class="medi">
        <div class="md">
          {List()}
          <h5>Active Ingredients</h5>
          {Description()}
      </div>
      </div> 
      </div>
   );
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     {/* <h3>Record List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Medicine</th>
           <th>Symptoms</th>
           <th>Level</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody> */}

       
     {/* </table> */}
     
     {/* {recordList()}; */}
     {/* <div class="medi">
        <div class="md">
          {List()}
          <h5>Active Ingredients</h5>
          <p>Expectorants and mucolytics OR Pholcodine and dextromethorphan</p>
      </div>
     </div>  */}
                {/* <div class="medi">
                <div class="md">
                    {recordList()}
                    <img src="images/medications/c1.png" alt="Delsym"></img>
                    <img src="images/medications/c2.jpeg" alt="MucinexDM"></img>
                    <h5>Active Ingredients</h5>
                    <p>Expectorants and mucolytics OR Pholcodine and dextromethorphan</p>
                  </div> */}

{/*                   
                  <div id="c" class="md">
                    <img src="images/medications/c1.png" alt="Delsym"></img>
                    <img src="images/medications/c2.jpeg" alt="MucinexDM"></img>
                    <h5>Active Ingredients</h5>
                    <p>Expectorants and mucolytics OR Pholcodine and dextromethorphan</p>
                  </div>
                  <div id="h" class="md">
                    <img src="images/medications/h1.jpg" alt="Tylenol"></img>
                    <img src="images/medications/h2.jpeg" alt="Motrin"></img>
                    <h5>Active Ingredients</h5>
                    <p>Antihistimines OR Aspirin, ibuprofen and naproxen sodium</p>
                  </div>
                  <div id="s" class="md">
                    <img src="images/medications/s1.png" alt="Alka-Seltzer"></img>
                    <img src="images/medications/s2.jpeg" alt="Pamprin"></img>
                    <h5>Active Ingredients</h5>
                    <p>Antibiotics like tetracycline, clarithromycin, and metronidazole</p>
                  </div>
                  <div id="f" class="md">
                    <img src="images/medications/f1.jpeg" alt="Mucinex"></img>
                    <img src="images/medications/f2.jpeg" alt="Amoxil"></img>
                    <h5>Active Ingredients</h5>
                    <p>Ibuprofen and paracetamol OR Penicillins and tetracyclines</p>
                  </div>
                  <div id="m" class="md">
                    <img src="images/medications/m1.jpg" alt="Bayer"></img>
                    <img src="images/medications/m2.jpg" alt="Neurontin"></img>
                    <h5>Active Ingredients</h5>
                    <p>Acetaminophen or ibuprofen</p>
                  </div>
                  <div id="sk" class="md">
                    <img src="images/medications/sk1.jpg" alt="CeraVe"></img>
                    <img src="images/medications/sk2.jpg" alt="Cortizone"></img>
                    <h5>Active Ingredients</h5>
                    <p>Exederm Flare Control 1% Hydrocortisone</p>
                  </div> */}
                </div>
  //  </div>
 );
}