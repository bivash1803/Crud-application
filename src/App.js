import "./App.css";
import React, { Component } from "react";
import ListItem from "./ListItem";
import axios from "axios";
import loadinggif from './loading.gif';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: "",
      editing: "false",
      editingIndex: null,
      notification: null,
      todos: [],
      loading: true
    };

    this.apiUrl = "https://62b560bd530b26da4ccda02e.mockapi.io";

    this.addTodo = this.addTodo.bind(this);

    this.alert = this.alert.bind(this);

    this.deleteTodo = this.deleteTodo.bind(this);

    this.handleChange = this.handleChange.bind(this);

    // this.generateTodoId = this.generateTodoId.bind(this);

    this.updateTodo = this.updateTodo.bind(this);
  }

  componentWillMount() {
    console.log("It will Mounted!!!");
  }

  async componentDidMount() {
    const response = await axios.get(`${this.apiUrl}/todos`);

    setTimeout(()=>{
      console.log(response);
      this.setState({
        todos: response.data,
        loading: false,
      });
    },1000)
  }

  handleChange(event) {
    this.setState({
      newTodo: event.target.value,
    });
    console.log(event.target.name, event.target.value);
  }

  // generateTodoId() {
  //   const lastTodo = this.state.todos[this.state.todos.length - 1];

  //   if (lastTodo) {
  //     return lastTodo.id + 1;
  //   }

  //   return 1;
  // }

  async addTodo() {
    const response = await axios.post(`${this.apiUrl}/todos`, {
      name: this.state.newTodo,
    });
    console.log(response.addTodo);

    const Todos = this.state.todos;
    Todos.push(response.data);
    this.setState({
      todos: Todos,
      newTodo: "",
    });
    this.alert("Todo added Succesfully");
  }

  editTodo(index) {
    const todo = this.state.todos[index];
    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex: index,
    });
  }

  async updateTodo() {
    const todo = this.state.todos[this.state.editingIndex];
      const response = await axios.put(`${this.apiUrl}/Todos/${todo.id}`,{
        name:this.state.newTodo
      })
      console.log(response);

    const todos = this.state.todos;
    todos[this.state.editingIndex] = response.data;
    this.setState({ todos, editing: false, editingIndex: null, newTodo: "" });
    this.alert("Todo updated  Succesfully");
  }

  alert(notification) {
    this.setState({
      notification,
    });

    setTimeout(() => {
      this.setState({
        notification: null,
      });
    }, 2000);
  }

  async deleteTodo(index) {
    const todos = this.state.todos;

    const todo = this.state.todos[index];
     await axios.delete(`${this.apiUrl}/todos/${todo.id}`)

    delete todos[index];
    this.setState({ todos });

    this.alert("Todo Deleted Succesfully");
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          {this.state.notification && (
            <div className="alert  mt-3 alert-success">
              <p className="text-center">{this.state.notification}</p>
            </div>
          )}

          <input
            type="text"
            name="todo"
            className="my-4 form-control"
            placeholder="Add a new todo"
            onChange={this.handleChange}
            value={this.state.newTodo}
          />

          <button
            onClick={this.state.editing ? this.addTodo : this.updateTodo}
            className="btn-Success my-4 form-control"
            disabled={this.state.newTodo.length < 5}
          >
            {this.state.editing ? "Add todo" : "Update todo"}
          </button>
         
         
          {
            this.state.loading &&
            <img src={loadinggif} alt=""/>
          }
          
          
            
            
          <ul className="list-group">
            {this.state.todos.map((item, index) => {
              return (
                <ListItem
                  key={item.id}
                  item={item}
                  editTodo={() => {
                    this.editTodo(index);
                  }}
                  deleteTodo={() => {
                    this.deleteTodo(index);
                  }}
                />
            
              );
            })}
          </ul>
  
        </div>
      </div>
    );
  }
}

export default App;
