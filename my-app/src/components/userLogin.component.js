import React, { Component } from 'react';
import axios from "axios";

export default class userLogin extends Component {

  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
     email: '',
     password: '',
    }
  }


  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }


  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    }

    axios({
      url: '/api/user/login',
      method: 'POST',
      data: user
    })

    .then(response => {
        console.log('Data has sent to server');
      if(response.data.email === this.state.email){
        alert("Welcome onboard!")
        window.location.replace("/posts/" + response.data._id )
      }else if(response.data ==="wrong password") {
        alert(response.data)
      }else{
        alert("no user with that email, please signup or try again")
      }

    })
    .catch(err => {
      console.log(err)
    });
  };

  showPassword() {
      var x = document.getElementById("myID");
      if (x.type === "password") {
      x.type = "text";
      } else {
      x.type = "password";
    }
  }


  render() {
    return (
      <div >
        <h3>Hello myFriend!</h3>
        <form onSubmit = {this.onSubmit}>
          <div className="form-group">

            <label>email:</label>
            <input type="text"
                   required
                   className="form-control"
                   value={this.state.email}
                   onChange={this.onChangeEmail}>
            </input>
            <label>Password:</label>
            <input type="password"
                   required
                   id="myID"
                  className="form-control"
                   value={this.state.password}
                   onChange={this.onChangePassword}>
            </input>
            <input type="checkbox" onChange={this.showPassword}></input>
            <label>Check Password</label>
          </div>

          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary" ></input>
          </div>
        </form>
      </div>
    )
  }
}
