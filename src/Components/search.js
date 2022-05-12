import React, {useState, useEffect} from "react";
import "../diagnosis.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import RecordList from "./recordList";

/* System states that control states and state transitions*/
const systemStates = ["WaitingForSymptom", "WaitingForDetails", "WaitingForFrequency","DisplayResult"]

/* Displayed info for asking user*/
const mainSymptoms = ["Fever", "Muscle Pain", "Skin Irritation"]
const mainSymptoms2 = ["Coughing", "Headache", "Stomachache"]


const frequency = ["1-2", "3-5", "7+ days"]
// const systemMessages = ["Advil, Claritin, etc..", 
//                         "Frequency, etc.",
//                          "DisplayResult"]



  async function onSubmit(e) {
    e.preventDefault();
  
    // When a post request is sent to the create url, we'll add a new record to the database.
    // const newPerson = { ...form };
    
    const newMedication = {

    }
    await fetch("http://localhost:5000/userRecommendation/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMedication),
    })
    .catch(error => {
      window.alert(error);
      return;
    });
  
    // setForm({ name: "", position: "", level: "" });
    // navigate("/");
  }

const Search = () =>  {

    /* ------------ STATES ------------*/

    const [mainSymptom, setMainSymptom] = useState('')      // Symptom useState
    const [systemState, setSystemState] = useState(0)

    /* USE_EFFECT HOOKS
    
    These will be used mainly for testing purposes. Anytime a message is printed to the console, it's because a variable has successfuly changed. 
    
    */

    useEffect(() => {
        console.log(mainSymptom);
    }
    , [mainSymptom])


    /* ------------ HELPER FUNCTIONS FOR SEARCH FUNCTIONALITY ------------ */

    function toggleNext() {

        if (!(systemState === systemStates.length-1)) {
            setSystemState(previousSystemState => previousSystemState + 1)
        }

    }

    function toggleBack() {
        if (!(systemState === 0)) {
            setSystemState(previousSystemState => previousSystemState - 1)
        }

        
    }



    /* ------------ COMPONENTS SECTION  ------------*/

    /* Next button */
    const Next = ({disabled}) => {
        return (
                <button className = "next" onClick = {toggleNext}> Next </button>
        )
    }

    /* Back button */
    const Back = (props) => {
        return (
            <button className = "previous" onClick = {toggleBack} > Back </button>
        )
    }

    /* Results from querying database */
    const Query = (props) => {
        return (
            <div></div>
        )
    }


    /* List of radio buttons
    
        PROPS
            1. listObjects: list of objects to be mapped out as a list -> used to display the list of radio buttons unique to each state of this component, etc: WaitingForSymptoms, WaitingForDetails, etc.
    
    */
    const ListOfRadioButtons = (props) => {
        return (
            <div>
                {/* List out a list of radio buttons */}
                {props.listObjects.map(s => (
                    // Wrap in container class and checkmark span for css purposes
                    <label class="container">

                        {/* Every listObject will be mapped out to a radio Button
                            - Each checked value, which is the literal display of the radio button being checked, will be based on which mainSymptom, which is what we set whenever we click on a button
                            - e.g: user clicks Fever, onChange() listener calls setMainSymptom(), setMainSymptom() changes mainSymptom to Fever, mainSymptom changed so checked = true
                            */}
                        <input
                            type="radio"
                            name="mainSymptom"
                            value={s}           
                            checked={mainSymptom === s}
                            onChange={e => setMainSymptom(e.currentTarget.value)}
                        />{" "}
                        {s}
                        <span class="checkmark"></span>
                    </label>
                ))}
            </div>
        );
    }

    const MedicationResult = (props) => {

    }
    /* List of checkboxes
    
    PROPS
    1. listObjects: list of objects to be mapped out as a list -> used to display the list of radio buttons unique to each state of this component, etc: WaitingForSymptoms, WaitingForDetails, etc.
    */
    const ListOfCheckBoxes = (props) => {
        return (
            <div>
                {/* List out a list of radio buttons */}
                {props.listObjects.map(s => (
                    // Wrap in container class and checkmark span for css purposes
                    <label className = "container" class="container">

                        {/* Every listObject will be mapped out to a radio Button
                            - Each checked value, which is the literal display of the radio button being checked, will be based on which mainSymptom, which is what we set whenever we click on a button
                            - e.g: user clicks Fever, onChange() listener calls setMainSymptom(), setMainSymptom() changes mainSymptom to Fever, mainSymptom changed so checked = true
                            */}
                        <input
                            type="radio"
                            name="mainSymptom"
                            value={s}           
                            checked={mainSymptom === s}
                            onChange={e => setMainSymptom(e.currentTarget.value)}
                        />{" "}
                        {s}
                        <span class="checkmark"></span>
                    </label>
                ))}
            </div>
        );
    }

    // function handle
    const Checkbox = (props) => {
        <input type="checkbox" {...props}></input>
    }
    const SpecificSymptom = (props) => {
        <label class="container">Wet Cough <sub class = "i">&#x1F6C8<span class = "itext">Any cough that produces mucus (phlegm). May feel congestion in the chest or back of the throat. Can bring mucus to your mouth</span></sub>
            {/* <Checkbox/> */}
        <span class="checkmark"></span>
        </label>
    }

    const SpecificSymptomSurvey = (props) => {
        if (mainSymptom === "Coughing") {
            return (                <div id="d1" class="d">
            <h3>Coughing</h3>
            <p>Type of coughing</p>
            <p>(Click on &#x1F6C8 for the descriptions)</p>
            <br></br>
            <div class = "dd">
                <div class = "box">
                <label class="container">Wet Cough <sub class = "i">&#x1F6C8<span class = "itext">Any cough that produces mucus (phlegm). May feel congestion in the chest or back of the throat. Can bring mucus to your mouth</span></sub>
                    <input type="checkbox" name="d"></input>
                    <span class="checkmark"></span>
                </label>

                <label class="container">Whooping Cough <sub class = "i">&#x1F6C8<span class = "itext">A severe hacking cough that is followed by a high-pitched intake of the breath. Indicates a highly contagious respiratory tract infection.</span></sub>
                    <input type="checkbox" name="d"></input>
                    <span class="checkmark"></span>
                </label>

                <label class="container">Dry, Tickling Cough <sub class = "i">&#x1F6C8<span class = "itext">Non-productive coughs that do not bring up any phlegm or mucus. A cough that causes a tickling sensation due to irritation in the throat.</span></sub>
                    <input type="checkbox" name="d"></input>
                    <span class="checkmark"></span>
                </label>
                </div>

                <div class = "box">
                <label class="container">Chest Cough <sub class = "i">&#x1F6C8<span class = "itext">Cough that causes chest pain or discomfort. Wheezing, shortness of breath, and coughing up green or yellow mucus may also occur.</span></sub>
                    <input type="checkbox" name="d"></input>
                    <span class="checkmark"></span>
                </label>

                <label class="container">Post-Viral Cough <sub class = "i">&#x1F6C8<span class = "itext">Cough after a viral respiratory infection like bronchitis or the flu. Cough may produce mucus or be non-productive and dry. Sore or irritation in the throat, hoarseness, and frequent throat clearing may also occur.</span></sub>
                    <input type="checkbox" name="d"></input>
                    <span class="checkmark"></span>
                </label>

                <label class="container">Bronchitis <sub class = "i">&#x1F6C8<span class = "itext">Frequent coughing with thickened, discolored mucus which can also be streaked with blood. Commonly occurs from a cold or other respiratory infections. Fatigue, shortness of breath, a slight fever and chills, and chest discomfort is also common.</span></sub>
                    <input type="checkbox" name="d"></input>
                    <span class="checkmark"></span>
                </label>

                </div>
            </div>
            </div>);
        }
    }
    /* State: Renders the current state e.g: WaitingForSymptom,WaitingForDetails,WaitingForFrequency,etc... */
    const State = (props) => {
             if (props.state === 0) {
                
            return (

                <div id = "Symptoms" >
                <p>Welcome to the self-diagnose.</p>
                <p>(DISCLAIMER: If you experience severe pain or illness, please seek professional guidance immediately)</p>
                <br></br>
                <p class="guidance" className = "guidance">Please choose from those categories listed below that describe the most symptom you have.</p>
                <p class="warning" className = "warning">(Choose one main symptom)</p>
                <br></br>
                <div class="ss" className = "ss">
                    <div class="box">
                        <ListOfRadioButtons listObjects = {mainSymptoms2}/>
                    </div>
                    <div class="box" className = "box">
                        <ListOfRadioButtons listObjects = {mainSymptoms}/>

                    </div>
                </div>
                <div class="N_P">
                <div class="NP">
                    {/* <button class="next" onclick="checkST('Details', t2, '#e8e8e8')">Next</button> */}
                    {/* <button class="next" onClick={() => {this.props.state = 1}}>Next</button> */}
                    <Next/>
                </div>
                </div>
            </div>
            );
                }
            else if (props.state === 1) {
                return (                
                
                <div id="Details" >

                
                <div id="d1" class="d">
                <h3>Coughing</h3>
                <p>Type of coughing</p>
                <p>(Click on &#x1F6C8 for the descriptions)</p>
                <br></br>
                <div class = "dd">
                    <div class = "box">
                    <label class="container">Wet Cough <sub class = "i">&#x1F6C8<span class = "itext">Any cough that produces mucus (phlegm). May feel congestion in the chest or back of the throat. Can bring mucus to your mouth</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>

                    <label class="container">Whooping Cough <sub class = "i">&#x1F6C8<span class = "itext">A severe hacking cough that is followed by a high-pitched intake of the breath. Indicates a highly contagious respiratory tract infection.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>

                    <label class="container">Dry, Tickling Cough <sub class = "i">&#x1F6C8<span class = "itext">Non-productive coughs that do not bring up any phlegm or mucus. A cough that causes a tickling sensation due to irritation in the throat.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    </div>

                    <div class = "box">
                    <label class="container">Chest Cough <sub class = "i">&#x1F6C8<span class = "itext">Cough that causes chest pain or discomfort. Wheezing, shortness of breath, and coughing up green or yellow mucus may also occur.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>

                    <label class="container">Post-Viral Cough <sub class = "i">&#x1F6C8<span class = "itext">Cough after a viral respiratory infection like bronchitis or the flu. Cough may produce mucus or be non-productive and dry. Sore or irritation in the throat, hoarseness, and frequent throat clearing may also occur.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>

                    <label class="container">Bronchitis <sub class = "i">&#x1F6C8<span class = "itext">Frequent coughing with thickened, discolored mucus which can also be streaked with blood. Commonly occurs from a cold or other respiratory infections. Fatigue, shortness of breath, a slight fever and chills, and chest discomfort is also common.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>

                    </div>
                </div>
                </div>


                <div id="d2" class="d">
                <h3>Headache</h3>
                <p>Type of Headache</p>
                <p>(Click on &#x1F6C8 for the descriptions)</p>
                <br></br>
                <div class="dd">
                    <div class="box">
                    <label class="container">Sinus <sub class = "i">&#x1F6C8<span class="itext">A deep and constant pain in your cheekbones, forehead or bridge of nose. Pain may intensify with head movement or strain. Runny nose, feeling of fullness in ears, fever, or swelling in the face can also occur.
                        </span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    <label class="container">Tension <sub class = "i">&#x1F6C8<span class="itext">A tension-type headache that can include a dull, aching head pain; sensation of tightness across the forehead or the sides to the back of the head; or a tenderness in the scalp, neck, and shoulder muscles. </span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    </div>
                    <div class="box">
                    <label class="container">Migraine <sub class = "i">&#x1F6C8<span class="itext">A headache that causes severe, throbbing pain or a pulsing sensation, usually on one side of the head. Nausea, vomiting, and sensitivity to light and sound may also occur.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    <label class="container">Cluster <sub class = "i">&#x1F6C8<span class="itext">A headache occurring in cyclical patterns or cluster periods. Commonly occurs when awoken in the middle of the night with intense pain in or around one eye on a side of the head. </span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    </div>
                </div>
                </div>
                <div id="d3" class="d">
                <h3>Stomachache</h3>
                <p>Type of Stomachache</p>
                <p>(Click on &#x1F6C8 for the descriptions)</p>
                <br></br>
                <div class="dd">
                    <div class="box">
                    <label class="container">Gastritis <sub class = "i">&#x1F6C8<span class="itext">Inflammation of the lining of the stomach that commonly causes most stomach ulcers. Nausea, vomiting, a feeling of fullness in the upper abdomen, or a burning ache in the upper abdomen may occur.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    <label class="container">Peptic Ulcer <sub class = "i">&#x1F6C8<span class="itext">Open sores that develop on the inside lining of the stomach and upper portion of your small intestine. Burning stomach pains, heartburn, and nausea can commonly occur. In the most severe cases, vomiting, feeling faint, appetite changes, and breathing troubles may occur. </span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    </div>
                    <div class="box">
                    <label class="container">Irritable Bowel Syndrome <sub class = "i">&#x1F6C8<span class="itext">A change in bowel habits which can cause abdominal pain, cramping, or bloating that can also be related to changes in the appearances of bowel movements.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    <label class="container">Chronic Diarrhoea <sub class = "i">&#x1F6C8<span class="itext">Digestive conditions which mainly result in loose or watery stools. Abdominal cramps, bloating, and nausea also commonly occur.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    </div>
                </div>
                </div>
                <div id="d4" class="d">
                <h3>Fever</h3>
                <p>Type of Fever</p>
                <p>(Click on &#x1F6C8 for the descriptions)</p>
                <br></br>
                <div class="dd">
                    <div class="box">
                    <label class="container">Intermittent <sub class = "i">&#x1F6C8<span class="itext">Occurs over the course of the day. Body temperature baseline fluctuates between normal and fever levels.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    <label class="container">Remittent <sub class = "i">&#x1F6C8<span class="itext">A fever that comes and goes with a fluctuating temperature, but never falls all the way back to normal body temperature.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    <label class="container">Continuous or sustained <sub class = "i">&#x1F6C8<span class="itext">A prolonged fever with little to no change in temperature over the course of a day.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    </div>
                    <div class="box">
                    <label class="container">Hectic <sub class = "i">&#x1F6C8<span class="itext">Identified either as intermittent or a remittent if the temperature range swings widely throughout the day, with ±1.4 C between the highest and lowest temperatures.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    <label class="container">Relapsing <sub class = "i">&#x1F6C8<span class="itext">An intermittent fever that spikes after days/weeks of normal body temperatures. Can be associated with animal bites or diseases like malaria.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    </div>
                </div>
                </div>
                <div id="d5" class="d">
                <h3>Muscle Pain</h3>
                <p>Type of Muscle Pain</p>
                <p>(Click on &#x1F6C8 for the descriptions)</p>
                <br></br>
                <div class="dd">
                    <div class="box">
                    <label class="container">Nociceptive Pain <sub class = "i">&#x1F6C8<span class="itext">Sharp, aching, or throbbing pain often caused by external damages to the body tissue. Commonly occurs in joints, muscles, skin, tendons, and bones.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    <label class="container">Inflammatory Pain <sub class = "i">&#x1F6C8<span class="itext">Spontaneous hypersensitivity to pain in response to tissue damage and inflammation. </span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    </div>
                    <div class="box">
                    <label class="container">Neuropathic Pain <sub class = "i">&#x1F6C8<span class="itext">Burning sensation with affected areas often sensitive to the touch. Excruciating pain, pins and needles, and numbness are common symptoms.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    </div>
                </div>
                </div>
                <div id="d6" class="d">
                <h3>Skin Irritation</h3>
                <p>Type of Skin Irritation</p>
                <p>(Click on &#x1F6C8 for the descriptions)</p>
                <br></br>
                <div class="dd">
                    <div class="box">
                    <label class="container">Eczema <sub class = "i">&#x1F6C8<span class="itext">Dry skin, itching, red to brownish-gray patches, small raised bumps, thickened, cracked skin, or raw, sensitive, and swollen skin from scratching.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    <label class="container">Granuloma Annulare <sub class = "i">&#x1F6C8<span class="itext">Raised rash or bumps in a ring pattern. Commonly affects young adults usually at the hands and feet.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    </div>
                    <div class="box">
                    <label class="container">Lichen Planus <sub class = "i">&#x1F6C8<span class="itext">Inflammation, swelling, and irritation on the skin that usually causes a rash that is itchy. Shiny red or purple firm bumps which may itch may be apparent.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    <label class="container">Pityriasis Rosea <sub class = "i">&#x1F6C8<span class="itext">A temporary rash of raised red, scaly patches on the body. Some may feel unwell for a few days before they get the rash, with headaches, high temperatures, or joint pain occurring alongside it.</span></sub>
                        <input type="checkbox" name="d"></input>
                        <span class="checkmark"></span>
                    </label>
                    </div>
                </div>
                </div>
                <div id = "d7" class = "d">
                <div class = "N_P">
                    <div class="NP">
                    {/* <button class="previous" onclick="openPage('Symptoms', defaultOpen, '#e8e8e8')">Previous</button> */}
                    <Back/>
                    </div>
                    <div class="NP">
                    {/* <button class="next" onclick="openF('Frequency', t3, '#e8e8e8')">Next</button> */}
                    <Next/>
                    </div>
                </div>
                </div>
            </div>);

            } else if (props.state === 2) {
                return (                <div id="Frequency"> 
                <p>How often do the symptoms appear?</p>
                <div className="ff">
                <div className="box">
                    <div id="outter">
                    <label className="container">1-2 days
                        <input type="radio" name="outter"></input>
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">3-5 days
                        <input type="radio" name="outter"></input>
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">1 week+
                        <input type="radio" name="outter"></input>
                        <span className="checkmark"></span>
                    </label>
                    </div>
                </div>
                <div className="box">
                    <div id="inner">
                    <label for="yes_no_radio">Do you have any additional information?</label>
                    <br></br>
                    <label class="container">Yes
                        <input type="radio" name="inner"></input>
                        <span class="checkmark"></span>
                    </label>
                    <label class="container">No
                        <input type="radio" name="inner"></input>
                        <span class="checkmark"></span>
                    </label>
                    </div>    
                </div>
                <div class = "N_P">
                <div class="NP">
                    {/* <button class="previous" onclick="openPage('Details', t2, '#e8e8e8')">Previous</button> */}
                    <Back/>
                </div>
                <div class="NP">
                    {/* <button class="next" onclick="openT('Treatment', t4, '#e8e8e8')">Next</button> */}
                    <Next/>
                </div>
                </div>
                </div>
            </div>);

            } else {
                return (                



                <div id="Treatment"> 
                <Routes>
                    <Route exact path="/" element={<RecordList symptom = {mainSymptom}/>} />
                 </Routes>
{/* 
                <h3>Medication Recommendation</h3>
                <div class="medi">
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
                  </div>
                </div> */}
                <p id="notice">Notice</p>
                <p>After a week, if the symptom is not getting better.</p>
                <p>Doctor appointment is highly recommended.</p>
                <div class = "N_P">
                  <div class="NP">
                    {/* <button class="previous" onclick="openPage('Frequency', t3, '#e8e8e8')">Previous</button> */}
                    <Back/>
                  </div>
                  <div class="NP">
                    <button class="submit" onclick="Done()">Submit</button>
                  </div>
                </div>
              </div>);

            }
        
    
    }

    return (
        <div className = "search">

            {/* <div class="whole" id="blur">
                <div class="top_nav">
                    <div class="left">
                    <div class="logo">
                        <p><span>Make-Med</span> Sync</p>
                        <a href="#" class="l1"> <i class="fas fa-heartbeat"></i> Make-Med Sync</a>
                    </div>
                    </div>
                    <div class="right">
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="index.html#services">Services</a></li>
                        <li><a href="#">Portfolio</a></li>
                        <li><a href="index.html#blogs">Blogs</a></li>
                        <li><a href="index.html#about">About</a></li>
                        <li><a href="#">Need help?</a></li>
                    </ul>
                    </div>
                </div>
                
                <div class = "bottom_nav"> class="tabcontent"
                    <button class="tablink" id="defaultOpen">Symptoms</button>
                <button class="tablink" id = "t2">Details</button>
                <button class="tablink" id = "t3">Frequency</button>
                <button class="tablink" id = "t4">Treatment</button>
                </div>
                
                <div id = "Symptoms" > class="tabcontent"
                    <p>Welcome to the self-diagnose.</p>
                    <p>(DISCLAIMER: If you experience severe pain or illness, please seek professional guidance immediately)</p>
                    <br></br>
                    <p class="guidance">Please choose from those categories listed below that describe the most symptom you have.</p>
                    <p class="warning">(Choose one main symptom)</p>
                    <br></br>
                    <div class="ss">
                        <div class="box">
                            <label class="container">Coughing
                            <input type="radio" id="coughing" name="radio"> </input>
                            <span class="checkmark"></span>
                            </label>
                            <label class="container">Headache
                            <input type="radio" id="headache" name="radio"></input>
                            <span class="checkmark"></span>
                            </label>
                            <label class="container">Stomachache
                            <input type="radio" id="stomachache" name="radio"></input>
                            <span class="checkmark"></span>
                            </label>
                        </div>

                        <div class="box">
                            <label class="container">Fever
                            <input type="radio" id="fever" name="radio"></input>
                            <span class="checkmark"></span>
                            </label>
                            <label class="container">Muscle Pain
                            <input type="radio" id="muscle" name="radio"></input>
                            <span class="checkmark"></span>
                            </label>
                            <label class="container">Skin irritation
                            <input type="radio" id="skin" name="radio"></input>
                            <span class="checkmark"></span>
                            </label>
                        </div>
                    </div>
                    <div class="N_P">
                    <div class="NP">
                        <button class="next" onclick="checkST('Details', t2, '#e8e8e8')">Next</button>
                    </div>
                    </div>
                </div>
                
                <div id="Details" > class="tabcontent"
                    <div id="d1" class="d">
                    <h3>Coughing</h3>
                    <p>Type of coughing</p>
                    <p>(Click on &#x1F6C8 for the descriptions)</p>
                    <br></br>
                    <div class = "dd">
                        <div class = "box">
                        <label class="container">Wet Cough <sub class = "i">&#x1F6C8<span class = "itext">Any cough that produces mucus (phlegm). May feel congestion in the chest or back of the throat. Can bring mucus to your mouth</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Whooping Cough <sub class = "i">&#x1F6C8<span class = "itext">A severe hacking cough that is followed by a high-pitched intake of the breath. Indicates a highly contagious respiratory tract infection.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Dry, Tickling Cough <sub class = "i">&#x1F6C8<span class = "itext">Non-productive coughs that do not bring up any phlegm or mucus. A cough that causes a tickling sensation due to irritation in the throat.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        </div>
                        <div class = "box">
                        <label class="container">Chest Cough <sub class = "i">&#x1F6C8<span class = "itext">Cough that causes chest pain or discomfort. Wheezing, shortness of breath, and coughing up green or yellow mucus may also occur.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Post-Viral Cough <sub class = "i">&#x1F6C8<span class = "itext">Cough after a viral respiratory infection like bronchitis or the flu. Cough may produce mucus or be non-productive and dry. Sore or irritation in the throat, hoarseness, and frequent throat clearing may also occur.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Bronchitis <sub class = "i">&#x1F6C8<span class = "itext">Frequent coughing with thickened, discolored mucus which can also be streaked with blood. Commonly occurs from a cold or other respiratory infections. Fatigue, shortness of breath, a slight fever and chills, and chest discomfort is also common.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        </div>
                    </div>
                    </div>
                    <div id="d2" class="d">
                    <h3>Headache</h3>
                    <p>Type of Headache</p>
                    <p>(Click on &#x1F6C8 for the descriptions)</p>
                    <br></br>
                    <div class="dd">
                        <div class="box">
                        <label class="container">Sinus <sub class = "i">&#x1F6C8<span class="itext">A deep and constant pain in your cheekbones, forehead or bridge of nose. Pain may intensify with head movement or strain. Runny nose, feeling of fullness in ears, fever, or swelling in the face can also occur.
                </span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Tension <sub class = "i">&#x1F6C8<span class="itext">A tension-type headache that can include a dull, aching head pain; sensation of tightness across the forehead or the sides to the back of the head; or a tenderness in the scalp, neck, and shoulder muscles. </span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        </div>
                        <div class="box">
                        <label class="container">Migraine <sub class = "i">&#x1F6C8<span class="itext">A headache that causes severe, throbbing pain or a pulsing sensation, usually on one side of the head. Nausea, vomiting, and sensitivity to light and sound may also occur.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Cluster <sub class = "i">&#x1F6C8<span class="itext">A headache occurring in cyclical patterns or cluster periods. Commonly occurs when awoken in the middle of the night with intense pain in or around one eye on a side of the head. </span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        </div>
                    </div>
                    </div>
                    <div id="d3" class="d">
                    <h3>Stomachache</h3>
                    <p>Type of Stomachache</p>
                    <p>(Click on &#x1F6C8 for the descriptions)</p>
                    <br></br>
                    <div class="dd">
                        <div class="box">
                        <label class="container">Gastritis <sub class = "i">&#x1F6C8<span class="itext">Inflammation of the lining of the stomach that commonly causes most stomach ulcers. Nausea, vomiting, a feeling of fullness in the upper abdomen, or a burning ache in the upper abdomen may occur.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Peptic Ulcer <sub class = "i">&#x1F6C8<span class="itext">Open sores that develop on the inside lining of the stomach and upper portion of your small intestine. Burning stomach pains, heartburn, and nausea can commonly occur. In the most severe cases, vomiting, feeling faint, appetite changes, and breathing troubles may occur. </span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        </div>
                        <div class="box">
                        <label class="container">Irritable Bowel Syndrome <sub class = "i">&#x1F6C8<span class="itext">A change in bowel habits which can cause abdominal pain, cramping, or bloating that can also be related to changes in the appearances of bowel movements.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Chronic Diarrhoea <sub class = "i">&#x1F6C8<span class="itext">Digestive conditions which mainly result in loose or watery stools. Abdominal cramps, bloating, and nausea also commonly occur.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        </div>
                    </div>
                    </div>
                    <div id="d4" class="d">
                    <h3>Fever</h3>
                    <p>Type of Fever</p>
                    <p>(Click on &#x1F6C8 for the descriptions)</p>
                    <br></br>
                    <div class="dd">
                        <div class="box">
                        <label class="container">Intermittent <sub class = "i">&#x1F6C8<span class="itext">Occurs over the course of the day. Body temperature baseline fluctuates between normal and fever levels.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Remittent <sub class = "i">&#x1F6C8<span class="itext">A fever that comes and goes with a fluctuating temperature, but never falls all the way back to normal body temperature.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Continuous or sustained <sub class = "i">&#x1F6C8<span class="itext">A prolonged fever with little to no change in temperature over the course of a day.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        </div>
                        <div class="box">
                        <label class="container">Hectic <sub class = "i">&#x1F6C8<span class="itext">Identified either as intermittent or a remittent if the temperature range swings widely throughout the day, with ±1.4 C between the highest and lowest temperatures.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Relapsing <sub class = "i">&#x1F6C8<span class="itext">An intermittent fever that spikes after days/weeks of normal body temperatures. Can be associated with animal bites or diseases like malaria.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        </div>
                    </div>
                    </div>
                    <div id="d5" class="d">
                    <h3>Muscle Pain</h3>
                    <p>Type of Muscle Pain</p>
                    <p>(Click on &#x1F6C8 for the descriptions)</p>
                    <br></br>
                    <div class="dd">
                        <div class="box">
                        <label class="container">Nociceptive Pain <sub class = "i">&#x1F6C8<span class="itext">Sharp, aching, or throbbing pain often caused by external damages to the body tissue. Commonly occurs in joints, muscles, skin, tendons, and bones.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Inflammatory Pain <sub class = "i">&#x1F6C8<span class="itext">Spontaneous hypersensitivity to pain in response to tissue damage and inflammation. </span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        </div>
                        <div class="box">
                        <label class="container">Neuropathic Pain <sub class = "i">&#x1F6C8<span class="itext">Burning sensation with affected areas often sensitive to the touch. Excruciating pain, pins and needles, and numbness are common symptoms.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        </div>
                    </div>
                    </div>
                    <div id="d6" class="d">
                    <h3>Skin Irritation</h3>
                    <p>Type of Skin Irritation</p>
                    <p>(Click on &#x1F6C8 for the descriptions)</p>
                    <br></br>
                    <div class="dd">
                        <div class="box">
                        <label class="container">Eczema <sub class = "i">&#x1F6C8<span class="itext">Dry skin, itching, red to brownish-gray patches, small raised bumps, thickened, cracked skin, or raw, sensitive, and swollen skin from scratching.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Granuloma Annulare <sub class = "i">&#x1F6C8<span class="itext">Raised rash or bumps in a ring pattern. Commonly affects young adults usually at the hands and feet.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        </div>
                        <div class="box">
                        <label class="container">Lichen Planus <sub class = "i">&#x1F6C8<span class="itext">Inflammation, swelling, and irritation on the skin that usually causes a rash that is itchy. Shiny red or purple firm bumps which may itch may be apparent.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">Pityriasis Rosea <sub class = "i">&#x1F6C8<span class="itext">A temporary rash of raised red, scaly patches on the body. Some may feel unwell for a few days before they get the rash, with headaches, high temperatures, or joint pain occurring alongside it.</span></sub>
                            <input type="checkbox" name="d"></input>
                            <span class="checkmark"></span>
                        </label>
                        </div>
                    </div>
                    </div>
                    <div id = "d7" class = "d">
                    <div class = "N_P">
                        <div class="NP">
                        <button class="previous" onclick="openPage('Symptoms', defaultOpen, '#e8e8e8')">Previous</button>
                        </div>
                        <div class="NP">
                        <button class="next" onclick="openF('Frequency', t3, '#e8e8e8')">Next</button>
                        </div>
                    </div>
                    </div>
                </div>
                
                <div id="Frequency"> class="tabcontent"
                    <p>How often do the symptoms appear?</p>
                    <div className="ff">
                    <div className="box">
                        <div id="outter">
                        <label className="container">1-2 days
                            <input type="radio" name="outter"></input>
                            <span className="checkmark"></span>
                        </label>
                        <label className="container">3-5 days
                            <input type="radio" name="outter"></input>
                            <span className="checkmark"></span>
                        </label>
                        <label className="container">1 week+
                            <input type="radio" name="outter"></input>
                            <span className="checkmark"></span>
                        </label>
                        </div>
                    </div>
                    <div className="box">
                        <div id="inner">
                        <label for="yes_no_radio">Do you have any additional information?</label>
                        <br></br>
                        <label class="container">Yes
                            <input type="radio" name="inner"></input>
                            <span class="checkmark"></span>
                        </label>
                        <label class="container">No
                            <input type="radio" name="inner"></input>
                            <span class="checkmark"></span>
                        </label>
                        </div>    
                    </div>
                    <div class = "N_P">
                    <div class="NP">
                        <button class="previous" onclick="openPage('Details', t2, '#e8e8e8')">Previous</button>
                    </div>
                    <div class="NP">
                        <button class="next" onclick="openT('Treatment', t4, '#e8e8e8')">Next</button>
                    </div>
                    </div>
                    </div>
                </div>
    

    
      <div id="Treatment">  class="tabcontent" put this inside div lateer
        <h3>Medication Recommendation</h3>
        <div class="medi">
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
          </div>
        </div>
        <p id="notice">Notice</p>
        <p>After a week, if the symptom is not getting better.</p>
        <p>Doctor appointment is highly recommended.</p>
        <div class = "N_P">
          <div class="NP">
            <button class="previous" onclick="openPage('Frequency', t3, '#e8e8e8')">Previous</button>
          </div>
          <div class="NP">
            <button class="submit" onclick="Done()">Submit</button>
          </div>
        </div>
      </div>
    </div> */}

  <div className="popup-message" id="popup">
    <p>Your diagnosis information has been saved successfully</p>
    <p>Please click OK to return to Homepage</p>
    <div class="s">
        <button type="button" class="ok-btn" onclick="window.location.href='index.html'">OK</button>
    </div>
  </div>

            <div className = "searchInputs"></div>

            {/* <Back/> */}
            <br></br>

                            <div class="top_nav">
                    <div class="left">
                    <div class="logo">
                        <p><span>Make-Med</span> Sync</p>
                        <a href="#" class="l1"> <i class="fas fa-heartbeat"></i> Make-Med Sync</a>
                    </div>
                    </div>
                    <div class="right">
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="index.html#services">Services</a></li>
                        <li><a href="#">Portfolio</a></li>
                        <li><a href="index.html#blogs">Blogs</a></li>
                        <li><a href="index.html#about">About</a></li>
                        <li><a href="#">Need help?</a></li>
                    </ul>
                    </div>
                </div>
                
                <div class = "bottom_nav"> class="tabcontent"
                    <button class="tablink" id="defaultOpen">Symptoms</button>
                <button class="tablink" id = "t2">Details</button>
                <button class="tablink" id = "t3">Frequency</button>
                <button class="tablink" id = "t4">Treatment</button>
                </div>
            {/* <input type = "text" placeholder = {placeHolder} onChange = {e => updateSymptom(e.target.value)}/> */}
            <State state = {systemState}/>
            <br></br>
            {/* <Next/> */}

        </div>
    );

};


export default Search