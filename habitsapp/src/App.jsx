import React, { useState } from "react";
import "./App.css";

function App() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const[Id,setId]=useState(0)

 
  
const addHabit = () => {
    if (newHabit.trim() !=="") {
    const habit = {
      id:Id,
      name:newHabit,
      streak: 0,
      lastCompleted:null,
    };
    setHabits([...habits, habit]);
    setNewHabit("");
    setId(Id+1)
  };
};

const deletehabit= (id) => {
    const updatedHabits1 = habits.filter((habit) => habit.id !== id);
    setHabits(updatedHabits1);
  };
const markCompleted = (id) => {
  const today = new Date().toISOString().split("T")[0];
  const updatedHabits = habits.map((habit) => {
    if (habit.id === id) {
      if(habit.lastCompleted){
       const lastCompletedDate = new Date(habit.lastCompleted);
        const differenceInDays = (new Date(today) - lastCompletedDate) / (1000 * 3600 * 24); 
        
        
        if (differenceInDays === 1) {
          return { ...habit, streak: habit.streak + 1, lastCompleted: today };
        }
        else if (differenceInDays > 1) {
          return { ...habit, streak: 0, lastCompleted: today };
        }
      }
       else {

        return { ...habit, streak: 1, lastCompleted: today };
      }
    }
    return habit;
  });
  setHabits(updatedHabits);
};

const checkdays = (days) => {
  return habits.filter((habit) => habit.streak >= days);
};

const week = checkdays(7);
const Month = checkdays(31);
const year=checkdays(365);


  
  return (
    <div className="body">
      <h1>HABIT STREAK COUNTER</h1>
      <h4>Set your habits and maintain streaks </h4>
      <h4>REMAINDER: Missing one day makes streaks to zero</h4>
      <div className="add">
        <input
          type="text"
          placeholder="Set a new habit"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />

        <button onClick={addHabit}>Add</button>
        
      </div>
      
      <p className="text">Your Habits :</p>
      <div className="habit-list">
        {habits.map((habit) => (
          <div key={habit.id} className="habit">
            <span className="habitname">{habit.name}</span>
            <span>You have streak of {habit.streak} days</span>
            <button className="mark" onClick={() => markCompleted(habit.id)}>Mark for today</button>
            <button  className="delete"onClick={()=>deletehabit(habit.id)}>DELETE</button>
            <br />
      
          </div>
        ))}
      </div>
      <div>
        <h2>Your consistency</h2> 
        <p>Habits you crossed a week 🎉         :</p>
        
        <div className="consistency-list">
        {week.length > 0 ? (
          week.map((habit) => (
            <div key={habit.id} className="habit">
              <span className="habitname">{habit.name}</span>
              
            </div>
          ))
        ) : (
          <p2>No habits completed for more than a week</p2>
        )}

      </div>

<p>Habits you crossed a month 🎉            :</p>
        
        <div className="consistency-list">
        {Month.length > 0 ? (
          Month.map((habit) => (
            <div key={habit.id} className="habit">
              <span className="habitname">{habit.name}</span>
              
            </div>
          ))
        ) : (
          <p2>No habits completed for more than a Month</p2>
        )}
        
      </div>

        
        
        </div>

    </div>
  );
}

export default App;
