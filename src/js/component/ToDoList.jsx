import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const List = () => {
    const [input, setInput] = useState("");
    const [tasks, setTasks] = useState([]);
    const [showOnHover, setShowOnHover] = useState({display: "none"});
    const [tasks2, setTasks2] = useState([]);
    const url = "https://playground.4geeks.com/apis/fake/todos/user/francescaameche";
    
    function fetchInfo () {
        fetch(url)
        .then((response) => response.json())
        .then((data) => setTasks2(data))
    }

    function createUsername () {
        fetch(url, {
            method: "POST",
            body: JSON.stringify([]),
            headers: {
                "Content-Type": "application/json"
            }
            })
        .then((response) => response.json())
        .then((data) => console.log(data))
    }

    function modifyTasks () {
            fetch(url, {
                method: "PUT",
                body: JSON.stringify([
                    setTasks2(tasks2.concat([input]))
                ])
            })
            .then((response) => response.json())
            .then((data) => setTasks2(data))
    }

    useEffect( () =>{
        fetchInfo();
        modifyTasks();
    }, [])

    function addItemToList(e) {
        if (e.key === "Enter") {
            setTasks(tasks.concat([input]));
            setInput("");
          }   
    }

	return (
            <div className="list">
                <h1>To-Do List</h1>
                <ul>
                    <li><input value={input} type="text" className="form-control" placeholder="To-Do" onChange={(e) => {setInput(e.target.value)}} onKeyDown= {addItemToList}/></li>
                    {tasks.map ((item, index) => (<li key={index} onMouseEnter={e => {setShowOnHover({display: "block"});}} onMouseLeave={e => {setShowOnHover({display: "none"})}}>{ item }{""}<button className="removeItem" style={showOnHover} onClick={() => setTasks(tasks.filter ((t, currentIndex) => index != currentIndex))}><FontAwesomeIcon icon={faX} /></button></li>))}
                    {tasks2.map((item, index) => (<li key={index} onMouseEnter={e => {setShowOnHover({display: "block"});}} onMouseLeave={e => {setShowOnHover({display: "none"})}}>{ item.label }<button className="removeItem" style={showOnHover} onClick={() => setTasks2(tasks2.filter ((t, currentIndex) => index != currentIndex))}><FontAwesomeIcon icon={faX} /></button></li>))}
                </ul>
                <p>{tasks.length + tasks2.length} items left</p>
                <button className="username" onClick={createUsername}>Create Username</button>
            </div>
	);
};

export default List;