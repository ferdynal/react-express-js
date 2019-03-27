import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';

class App extends Component {
  state = {todo : [], users : []}
  componentDidMount(){
    this.getItem()
    this.getUsers()
  }

  getItem = () => {
    Axios.get('http://localhost:2000/alltodo')
    .then((res) => {
      console.log(res)
      this.setState({todo : res.data})
    })
  }

  getUsers = () => {
    Axios.get('http://localhost:2000/alluser')
    .then((res) => {
      console.log(res)
      this.setState({users : res.data})
    })
  }

  dropDown = () => {
    var jsx = this.state.users.map((val) => {
      return(
        <option value={val.id}>{val.username}</option>
      )
    })
    return jsx
  }

  addTodo = () => {
    var jsx = this.state.todo.map((val, index) => {
      return(
        <tr>
          <td>{index +1}</td>
          <td>{val.username}</td>
          <td>{val.to_do}</td>
        </tr>
      )
    })
    return jsx
  }

  onBtnAdd = () => {
    var newData = {
      user : parseInt(this.refs.username.value),
      todo : this.refs.todo.value
    }

    Axios.post('http://localhost:2000/addtodo' , newData)
    .then((res)=>{
      alert(res.data)
      this.getItem()
      this.refs.todo.value = ''
    })
  }

  render() {
    return (
      <div class='container'>
        <h3>Todo App With React Express</h3>
        <table className='table'>
          <tr>
              <td>No.</td>
              <td>User</td>
              <td>Todo</td>
          </tr>
          {this.addTodo()}
        </table>
        <div className='row'>
          <div className='col-md-4'>
            <select ref='username' class="form-control form-control-sm">
              {this.dropDown()}
            </select>
          </div>
          <div className='col-md-4'>
            <input ref='todo' type='text' className='form-control' placeholder='masukan todo' />
            </div> 
          <div className='col-md-4'>
            <input type='button' className='btn btn-info' onClick={this.onBtnAdd} value='add'/>
          </div> 
        </div>
      </div>
    );
  }
}

export default App;
