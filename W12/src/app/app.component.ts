import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { FormsModule } from '@angular/forms';   // ✅ Import FormsModule

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,                    
  imports: [CommonModule, FormsModule],  

})
export class AppComponent {
  title = 'Todo List';
  
  // Array to store tasks
  tasks: Task[] = [];
  
  // New task input
  newTaskText = '';
  
  // Task being edited
  editingTask: Task | null = null;
  editText = '';
  
  // Add a new task
  addTask() {
    if (this.newTaskText.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: this.newTaskText,
        completed: false
      };
      this.tasks.push(newTask);
      this.newTaskText = '';
    }
  }
  
  // Delete a task
  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    if (this.editingTask && this.editingTask.id === id) {
      this.editingTask = null;
    }
  }
  
  // Toggle task completion
  toggleComplete(task: Task) {
    task.completed = !task.completed;
  }
  
  // Start editing a task
  startEdit(task: Task) {
    this.editingTask = task;
    this.editText = task.text;
  }
  
  // Save the edited task
  saveEdit() {
    if (this.editingTask && this.editText.trim()) {
      this.editingTask.text = this.editText;
      this.editingTask = null;
    }
  }
  
  // Cancel editing
  cancelEdit() {
    this.editingTask = null;
  }
}

// Define Task interface
interface Task {
  id: number;
  text: string;
  completed: boolean;
}