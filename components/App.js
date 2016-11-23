import React from 'react'
import Footer from './Footer'
import AddToDo from '../containers/AddToDo'
import VisibleTodoList from '../containers/VisibleTodoList'

const app = () =>(
    <div>
        <AddToDo/>
        <VisibleTodoList/>
        <Footer/>
    </div>
)

export default App