import {Component} from 'react'
import {v4 as uuid} from 'uuid'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    taskName: '',
    category: tagsList[0].displayText,
    tasks: [],
    activeId: '',
  }

  changeTaskName = event => {
    // console.log(event.target.value)
    this.setState({taskName: event.target.value})
  }

  changeCategory = event => {
    console.log(event.target.value)
    const cat = event.target.value
    console.log(cat[0] + cat.slice(1).toLowerCase())
    this.setState({category: cat[0] + cat.slice(1).toLowerCase()})
  }

  addTask = e => {
    e.preventDefault()
    const {tasks, taskName, category} = this.state
    const updatedTasks = [...tasks, {id: uuid(), taskName, category}]
    // console.log(updatedTasks)
    this.setState({
      tasks: updatedTasks,
      taskName: '',
      category: tagsList[0].displayText,
    })
  }

  changeActiveId = event => {
    this.setState({activeId: event.target.id})
  }

  renderTasksView = () => {
    const {tasks, activeId} = this.state
    let filteredTasks
    if (activeId === '') {
      filteredTasks = tasks
    } else {
      filteredTasks = tasks.filter(task =>
        task.category.includes(activeId[0] + activeId.slice(1).toLowerCase()),
      )
    }
    console.log(filteredTasks)

    return (
      <ul className="tasks-container">
        {filteredTasks.length === 0 ? (
          <p>No Tasks Added Yet</p>
        ) : (
          filteredTasks.map(task => (
            <li key={task.id} className="task-container">
              <p>{task.taskName}</p>
              <p className="category-text">{task.category}</p>
            </li>
          ))
        )}
      </ul>
    )
  }

  render() {
    const {taskName, category, activeId} = this.state

    return (
      <div className="main-container">
        <div className="left-container">
          <h1 className="heading">Create a task!</h1>
          <form onSubmit={this.addTask}>
            <label htmlFor="task">Task</label>
            <input
              type="text"
              id="task"
              onChange={this.changeTaskName}
              value={taskName}
              placeholder="Enter the task here"
              className="task-input"
            />
            <label htmlFor="tags">Tags</label>
            <br />
            <select
              id="tags"
              onChange={this.changeCategory}
              value={category.toUpperCase()}
              className="tags-input"
            >
              {tagsList.map(tag => (
                <option value={tag.optionId} key={tag.optionId}>
                  {tag.displayText}
                </option>
              ))}
            </select>
            <div className="button-container">
              <button type="submit" className="add-task-button">
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="right-container">
          <div>
            <h1>Tags</h1>
            <ul className="category-container">
              {tagsList.map(tagItem => (
                <li key={tagItem.optionId}>
                  <button
                    type="button"
                    id={tagItem.optionId}
                    onClick={this.changeActiveId}
                    className={
                      tagItem.optionId === activeId
                        ? 'active-button'
                        : 'category-button'
                    }
                  >
                    {tagItem.displayText}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1>Tasks</h1>
            {this.renderTasksView()}
          </div>
        </div>
      </div>
    )
  }
}

export default MyTasks
