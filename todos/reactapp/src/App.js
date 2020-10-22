import React from 'react';

import './App.css';

class App extends React.Component{


  constructor(props){

    super(props);

    this.state={
      todoList:[],
      activeItem:{
        id: null,
        title: '',
        completed: false,
      },
      editing: false,
    }
    this.fetchTasks = this.fetchTasks.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getCookie = this.getCookie.bind(this)
    this.startEdit =  this.startEdit.bind(this)
    this.startDelete = this.startDelete.bind(this)
  };
  componentDidMount(){
    this.fetchTasks()

  }
  getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
csrftoken = this.getCookie('csrftoken');
  fetchTasks(){

    fetch('http://localhost:8000/api/task-list/')
    .then(response=> response.json())
    .then(data=>
      this.setState({
        todoList: data
      })
      
      
      )

  }
  handleChange(e){
    // var name = e.target.name
    var value = e.target.value
  
  
    this.setState({
      activeItem:{

        ...this.state.activeItem,
      title: value


      }
      

      
    })

   
  }
  startEdit(e){

    this.setState({
      activeItem: {
        ...this.state.activeItem,
        id: e.id,
        title: e.title
      },
      editing: true

    })


  }
  taskComplete(e){
    
    var url = `http://localhost:8000/api/task-update/${e.id}/` 
    e.completed = !e.completed


   
    fetch(url, {
      method: 'POST',
      headers: {
          'Content-type': 'application/json',
          'X-CSRFToken': this.csrftoken
      },
      body: JSON.stringify(e)}).then((response)=>{
        this.fetchTasks()
        this.setState({
          activeItem:{
            id: null,
            title: '',
            completed: false,
          }
        })
      }).catch(function(error){ console.log("ERROR", error)})
   
  }
  startDelete(e){
    var id =  e.id
     
    var url = `http://localhost:8000/api/task-delete/${id}/`

   fetch(url, {
    method: 'DELETE',
    headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': this.csrftoken
    },
   }).then((response)=>{
      this.fetchTasks()
      this.setState({
        activeItem:{
          id: null,
          title: '',
          completed: false,
        }
      })
    }).catch(function(error){ console.log("ERROR", error)
   })
  }

  handleSubmit(e){
 
    e.preventDefault();

   if(!this.state.editing){

        
     var url = 'http://localhost:8000/api/task-create/'
   }
   else {
      var id =  this.state.activeItem.id
     
      var url = `http://localhost:8000/api/task-update/${id}/`
      this.setState({
        editing: false
      })  
    }


    
    fetch(url, {
      method: 'POST',
      headers: {
          'Content-type': 'application/json',
          'X-CSRFToken': this.csrftoken
      },
      body: JSON.stringify(this.state.activeItem)}).then((response)=>{
        this.fetchTasks()
        this.setState({
          activeItem:{
            id: null,
            title: '',
            completed: false,
          }
        })
      }).catch(function(error){ console.log("ERROR", error)})
   

  }

  render(){
    var tasks =  this.state.todoList;
    var self = this
    return(


      <div className="container">
        <h2>TO Do App</h2>
        <div id="task-container">
          <div id="form-wrapper">
            <form onSubmit={this.handleSubmit}  id="form">

              <div className="flex-wrapper">
                <div style={{flex:6}}> 
                       <input  onChange={this.handleChange} name="title" id="title" className="form-control" type="text" value={this.state.activeItem.title}></input>
                </div>
                <div style={{flex:1}}>
                  <button  name="" id="submit" className="btn btn-primary" value="Submit" >Submit</button>
                </div>
          
              </div>
            </form>
          </div>
          <div id="list-wrapper">
            {tasks.map((task, index)=>{
              return(
                <div key={index} className="task-wrapper flex-wrapper">

              <div style={{flex:7}} onClick={()=>self.taskComplete(task)}> {(task.completed)? <strike  >{task.title}</strike>: <span>{task.title}</span>}</div>
                  <button className="btn btn-outline-info Edit" onClick={()=>self.startEdit(task)}>
                          Edit 
                  </button> 
                  <button className="btn btn-danger ml-1 Delete" onClick={()=>self.startDelete(task)}>
                          - 
                  </button>
                  
                  </div>

              )
            })}
          </div>
        </div>


        
      </div>
    )
  }


}

export default App;
