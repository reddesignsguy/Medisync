import React from 'react';
import { useNavigate, Link } from "react-router-dom";

function GoTo(props) {

};

  
  class Title extends React.Component {
    render() {
        let text = this.props.text;
        
        return (  
          // <h1 class = "SERVICES"> {text}</h1>
          <h1 class = "SERVICES"> <span class="first">OUR</span> SERVICES </h1>
        );
      
    }
  }

//   class Container extends React.Component {
//     render() {
//       return (
//           <div className = 'container'>
//             <i class = {this.props.icon}></i>
//             <h1 class = 'txt hdr'> {this.props.title}</h1>
//             <text class = 'txt'> {this.props.text} </text>    
//             <br></br>
//             <button class = "btn" onClick={() => console.log("Clicked")}>
//              {this.props.button} <span className = "fas fa-chevron-right"></span>
//           </button>

//           {/* <a href  = "#" className = "btn" > {this.props.text} test<span className = "fas fa-chevron-right"></span> </a> */}
//           </div>
  
  
//       );
//     }
//   }

  class Container extends React.Component {
    
    render() {
      const link = this.props.link;
      console.log(link)
      return (
          <div className = 'box'>
            <i className = "fas fa-notes-medical"></i>
            <h3> {this.props.title}</h3>
            <p> {this.props.text} </p>    

          <Link to = {link} ><a href  = "#" className = "btn" onClick = {(e) => GoTo("/search")} > {this.props.button}<span className = {this.props.icon}></span> </a> </Link>
          </div>
  
      );
    }
  }

const title = <Title text = "OUR SERVICES"/>
const container1 = <Container title = "Self-diagnosis" 
                              text = "Not feeling well? We will help" 
                              button = "Start Here"
                              icon = "fas fa-notes-medical"
                              link = "/search"/>


const container2 = <Container title = "Profile" 
                              text = "We keep all your information and medical information here!" 
                              button = "Check-Out More"
                              icon = "fas fa-pills"/>


const container3 = <Container title = "Connect with doctor" 
                              text = "Are you busy on vacation, business trip, or want quick advice about your medicine?"
                              button = "Click Here"
                              icon = "fas fa-user-md"/>

        
export default function Services() {
    return(
        <section className = "services">
            {/* <div class = "Float-Container">
                {container1}
                {container2}
                {container3}
            </div> */}
            <h1 class="heading"> our <span>services</span> </h1>
            <div className = "box-container">
                {container1}
                {/* {container2}
                {container3} */}
            </div>
        </section>
    );
}
//export default Services;