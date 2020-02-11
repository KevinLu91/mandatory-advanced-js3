import React from 'react';
import axios from 'axios';
import {Redirect } from "react-router-dom";
import {token$, updateToken} from './store';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import jwt from 'jsonwebtoken';
import Header from './Header'

class Todos extends React.Component{
  constructor(props){
    super(props);
    this.state={
      email: '',
      token: token$.value,
      todos: [],
      content: '',
    }
    this.Logout = this.Logout.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  getTodos(){
    this.subscription = token$.subscribe((token) =>{
      this.setState({token})
    });
    const decoded = jwt.decode(this.state.token);

    if(decoded){
      this.setState({email: decoded.email});
    }

    axios.get('http://3.120.96.16:3002/todos',{
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    })
    .then((response)=>{
      this.setState({todos: response.data.todos})
    }).catch((error)=>{
      updateToken(null)
    })
  }

  componentDidMount(){
    this.getTodos()
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  Logout(){
    updateToken(null)
  }

  onChange(e){
    this.setState({content: e.target.value})
  }

  onSubmit(e){
    e.preventDefault()

    axios.post('http://3.120.96.16:3002/todos', {
      content: this.state.content,
    }, {
      headers:{
        Authorization: `Bearer ${this.state.token}`
      }
    })
    .then((response) =>(
      this.setState({content: ''})
    )).then((data) =>(
      this.getTodos()
    )).catch((error) =>(
      alert(error)
    ))
  }

  onDelete(e){
    axios.delete('http://3.120.96.16:3002/todos/' + e.target.dataset.id, {
      headers:{
        Authorization: `Bearer ${this.state.token}`
      }
    })
    .then((response) =>(
      this.getTodos()
    ))
    .catch((error) =>(
      alert(error)
    ))
  }

  render(){

    if(!this.state.token){
      return <Redirect to='/login' />
    }

    return(
      <div className='backgroundContainerTodo'>
        <Header />
        <h2>{this.state.email}: Todolist</h2>
        <button onClick={this.Logout}>Sign Out</button>
        <div className='todoContainer'>
          <form onSubmit={this.onSubmit}>
            <input className='addTodo' onChange={this.onChange} value={this.state.content} placeholder='Add todo' required/>
            <button type="submit">Add</button>
          </form>
          <div>
            <ul>
              <TransitionGroup>
                {this.state.todos.map( list =>(
                  <CSSTransition key={list.id} classNames='todo' timeout={700}>
                    <li key={list.id}>{list.content}<img data-id={list.id} onClick={this.onDelete} src="images/delete.png" alt='Avengers'/></li>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Todos;
