import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const List = () => {
    const [input, setInput] = useState("");
    const [tasks, setTasks] = useState([]);
    const [showOnHover, setShowOnHover] = useState({display: "none"});
    const url = "https://playground.4geeks.com/apis/fake/todos/user/francescaameche";
    
    function fetchInfo () {
        fetch(url)
        .then((response) => response.json())
        .then((data) => setTasks(data))
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
        .then((data) => {return data})
    }

    function modifyTasks (list) {
            fetch(url, {
                method: "PUT",
                body: JSON.stringify(list),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((data) => console.log(data))

    }

    useEffect( () =>{
    
        fetchInfo();
    }, [])

    function addItemToList(e) {
        if (e.key === "Enter") {
            setTasks(tasks.concat([{label: input, done: false}]));
            modifyTasks(tasks.concat([{label: input, done: false}]));
            setInput("");
          }   
    }
    function deleteItemFromList(index) {
        setTasks(tasks.filter ((t, currentIndex) => index != currentIndex))
        modifyTasks(tasks.filter ((t, currentIndex) => index != currentIndex))
    }
    console.log(tasks);
	return (
            <div className="list">
                <h1>To-Do List</h1>
                <ul>
                    <li><input value={input} type="text" className="form-control" placeholder="To-Do" onChange={(e) => {setInput(e.target.value)}} onKeyDown= {addItemToList}/></li>
                    {tasks && tasks.length > 0 && tasks.map ((item, index) => (<li key={index} onMouseEnter={e => {setShowOnHover({display: "block"});}} onMouseLeave={e => {setShowOnHover({display: "none"})}}>{ item.label }{""}<button className="removeItem" style={showOnHover} onClick={() => deleteItemFromList(index)}><FontAwesomeIcon icon={faX} /></button></li>))}
                </ul>
                <p>{tasks.length} items left</p>
                <button className="username" onClick={createUsername}>Create Username</button>
            </div>
	);
};

export default List;