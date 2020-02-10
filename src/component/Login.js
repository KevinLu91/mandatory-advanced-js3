import React from 'react';
import axios from 'axios';
import {Link, Redirect } from "react-router-dom";
import {token$, updateToken} from './store';
import Header from './Header'

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email: '',
      password: '',
      token: token$.value,
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e){
    e.preventDefault()

    axios.post('http://3.120.96.16:3002/auth', {
      email: this.state.email,
      password: this.state.password,
    },
  )
    .then((response)=>(
      updateToken(response.data.token)
    ))
    .catch((error) =>(
      alert(error)
    ))
  }

  componentDidMount() {
    this.subscription = token$.subscribe((token) => this.setState({ token }));
    if(this.state.token){
      alert('You are still logged in, please sign out first!')
    }
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render(){

    if(this.state.token){
      return <Redirect to='/'/>
    }

    return(
      <div className='backgroundContainer'>
        <div className="header">
          <h2>Login EC Todo</h2>
        </div>
        <Header />
        <form className="loginContainer" onSubmit={this.onSubmit}>
          <div className='imgContainer'>
            <img src="images/thor.jpg" className='avatar'/>
          </div>
          <div className="container">
            <label><b>Username</b></label>
            <input
              type='text'
              placeholder='Enter Email'
              name='email'
              onChange={this.onChange}
              value={this.state.email}
              required
              />
            <label><b>Password</b></label>
            <input
              name='password'
              onChange={this.onChange}
              type='password'
              placeholder='Enter Password'
              value={this.state.password}
              required
              />
           </div>

           <div className='container'>
             <button className="submitBtn" typ="submit">Login</button>
           </div>
        </form>
          <div className='containerRegistration'>
            <p>Create account: <Link to='/Registration'>Registration</Link></p>
          </div>
      </div>
    )
  }
}

export default Login;
