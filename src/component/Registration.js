import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router,Route, Link, Redirect } from "react-router-dom";
import {token$, updateToken} from './store';
import Header from './Header';

class Registration extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email: '',
      password: '',
      token: token$.value,
      redirect: false,
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e){
    e.preventDefault()

    axios.post('http://3.120.96.16:3002/register', {
      email: this.state.email,
      password: this.state.password,
    },
  )
    .then((response)=>(
      console.log(response.data),
      this.setState({redirect:true})
    ))
    .catch((error) =>(
       alert(error)
    ))
  }

  componentDidMount() {
    this.subscription = token$.subscribe((token) => this.setState({ token }));
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render(){

    if(this.state.redirect){
      return <Redirect to='/login' />
    }

    if(this.state.token){
      alert('You are still logged in, please sign out first!');
      return <Redirect to='/' />
    }

    return(
      <div className='backgroundContainer'>
        <h2>Registration EC Todo</h2>
        <Header />
        <form className='loginContainer' onSubmit={this.onSubmit}>
          <div className='imgContainer'>
            <img src="images/thor.jpg" className='avatar'/>
          </div>

          <div className="container">
            <label><b>Create Username</b></label>
            <input
              type='text'
              placeholder='Enter Email'
              name='email'
              onChange={this.onChange}
              value={this.state.email}
              required
              />
            <label><b>Create Password</b></label>
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
             <button className='submitBtn' type="submit">Register</button>
           </div>
        </form>
        <div className='containerRegistration'>
          <p>Go to: <Link to='/Login'>Login</Link></p>
        </div>
      </div>
    )
  }
}

export default Registration;
