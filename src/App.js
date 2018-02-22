import React, { Component } from 'react';
import './App.css';
var uuid = require('uuid')
var firebase = require('firebase')

  //setup firebase
  var config = {
    apiKey: "AIzaSyDNuUdt-XL06F7WPqvyhNOm2QafRGgQ6oc",
    authDomain: "businesscontacts-71dc0.firebaseapp.com",
    databaseURL: "https://businesscontacts-71dc0.firebaseio.com",
    projectId: "businesscontacts-71dc0",
    storageBucket: "businesscontacts-71dc0.appspot.com",
    messagingSenderId: "681058882148"
  };
  firebase.initializeApp(config);



class App extends Component {

  constructor(props){
    super()
    this.state = {
      id:uuid.v1(),
      name:'',
      answers:{
        q1:'',
        q2:'',
        q3:'',
        q4:'',
      },
      submitted:false
    }
  }

  //submit name form
  handleNameSubmit(event){
    var name = this.refs.name.value
    event.preventDefault();

    this.setState({
      name:name
    })
  }

  //handle question input changes
  handleQuestionChange(event){
    var answers = this.state.answers

    if(event.target.name === 'q1'){
      answers.q1 = event.target.value
    } else if(event.target.name === 'q2'){
      answers.q2 = event.target.value
    } else if(event.target.name === 'q3'){
      answers.q3 = event.target.value
    } else if(event.target.name === 'q4'){
      answers.q4 = event.target.value
    }

    this.setState({answers:answers}, function(){
      console.log(this.state)
    })
  }

  //submit question form
  handleQuestionSubmit(event){
    firebase.database().ref('surveys/'+this.state.id).set({
      name:this.state.name,
      answers:this.state.answers
    });

    console.log('submitted')
    this.setState({submitted:true}, function(){
      console.log(this.state)
    })

    event.preventDefault();
  }




  render() {
    var user;
    var questions;

    //if name is entered, show survey
    if(this.state.name && this.state.submitted === false){
      user= <h2>Welcome {this.state.name}</h2>
      questions = <span>

        <h3>Survey Questions</h3>
        <form onSubmit={this.handleQuestionSubmit.bind(this)}>

          <div>
            <label>What is your favorite operating system?</label><br />
            <input type='radio' name='q1' value='windows' onChange={this.handleQuestionChange.bind(this)} />Windows<br/>
            <input type='radio' name='q1' value='OSX' onChange={this.handleQuestionChange.bind(this)} />OSX<br/>
          </div>

          <div>
            <label>What is your favorite color?</label><br />
            <input type='radio' name='q2' value='blue' onChange={this.handleQuestionChange.bind(this)} />Blue<br/>
            <input type='radio' name='q2' value='red' onChange={this.handleQuestionChange.bind(this)} />Red<br/>
          </div>

          <div>
            <label>What is your favorite food?</label><br />
            <input type='radio' name='q3' value='pizza' onChange={this.handleQuestionChange.bind(this)} />Pizza<br/>
            <input type='radio' name='q3' value='hamburger' onChange={this.handleQuestionChange.bind(this)} />Hamburger<br/>
          </div>

          <div>
            <label>What is your favorite soup?</label><br />
            <input type='radio' name='q4' value='tomato' onChange={this.handleQuestionChange.bind(this)} />Tomato<br/>
            <input type='radio' name='q4' value='potato' onChange={this.handleQuestionChange.bind(this)} />Potato<br/>
          </div>

          <input type='submit' value='submit'/>

        </form>
      </span>


    //if no name is entered, show name input
    } else if(!this.state.name && this.state.submitted === false){
      user = <span>
        <h2>Please enter your name to begin the survey</h2>
        <form onSubmit={this.handleNameSubmit.bind(this)}>
          <input type='text' placeholder='Enter Name...' ref='name' />
        </form>
      </span>
      questions = '';

    //if submitted show thank you
    } else if(this.state.submitted === true){
      user = <h2>Thank You {this.state.name}</h2>
    }


    return (
      <div className="App">
      
        <header className="App-header text-center">
          <h1 className="App-title">Simple Survey</h1>
        </header>

        <div className='text-center'>
          {user}
        </div>

        <div className='container'>
          {questions}
        </div>
        
      </div>
    );


  }
}

export default App;








