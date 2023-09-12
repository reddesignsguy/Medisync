Medisync allows users to retrieve medicine based on inputted symptoms.

Tech stack:
MongoDB (Storing user's medical records)
ExpressJS (Creating endpoint services that interact with database)
ReactJS (Front-end)
NodeJS (Back-end server)

Example of endpoints:
```
// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("records")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    medicine: req.body.medicine,
    symptom: req.body.symptom,
    level: req.body.level,
  };
  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();  
    let myquery = { _id: ObjectId( req.params.id )};  
    let newvalues = {    
      $set: {      
        name: req.body.name,     
        position: req.body.position,      
        level: req.body.level,    
    },  
  };
  
  // This section will help you delete a record
  recordRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect.collection("records").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
  });
});
```

```
Example of front-end component:

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
```
### `Scripts`
### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.\

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
