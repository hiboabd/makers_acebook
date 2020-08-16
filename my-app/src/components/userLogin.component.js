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
    var wrongPassword = document.getElementById('wrong-password')
    wrongPassword.innerHTML = "";

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
        console.log('Data has sent to server now now');
        console.log(response)

      if(response.data.success){
        window.location.replace("/posts/" + response.data.userId)
      }else{
        wrongPassword.innerHTML = "Email and/or password is incorrect, please try again";
        wrongPassword.setAttribute("style", "color:red");
      }
    })
    .catch(err => {
      console.log(err)
    });
  };

  showPassword() {
      var passwordInput = document.getElementById("password-id");
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
      }
    }

  render() {
    return (
      <div className="col-md-6 offset-md-3"> 
        <div className="wrapper">
        <center>
        <h3>Log in to Your Account</h3>
        </center>
        <form onSubmit = {this.onSubmit}>
          <div className="form-group">


            <label>Email:</label>
            <input type="email"
                   placeholder = "Email"
                   required
                   id="email"
                   className="form-control"
                   value={this.state.email}
                   onChange={this.onChangeEmail}>
            </input>
            <label>Password:</label> <div id="wrong-password"></div>
            <input type="password"
                   placeholder = "Password"
                   required
                   id="password-id"
                   className="form-control"
                   value={this.state.password}
                   onChange={this.onChangePassword}>
            </input>

            <div className="see-password">
              <input type="checkbox" onChange={this.showPassword}></input>
              <label className="see-pass-wording">See Password</label>
            </div>
          </div>

          <div className="form-group">
            <input id="login" type="submit" value="Login" className="btn btn-dark" ></input>
          </div>
        </form>
        </div>
      </div>
    )
  }
}
