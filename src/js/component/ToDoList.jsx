import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const List = () => {
    const [items, setItems] = useState("");
    const [addToList, setAddToList] = useState([]);
    const [showOnHover, setShowOnHover] = useState({display: "none"});
    const [tasks, setTasks] = useState([]);
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
        .then((data) => console.log(data))
    }

    function modifyTasks () {
        fetch(url, {
            method: "PUT",
            body: JSON.stringify([
                {
                    "done": false,
                    "id": 1,
                    "label": "Wash dishes"
                },
                {
                    "done": false,
                    "id": 2,
                    "label": "Do laundry"
                },
                {
                    "done": false,
                    "id": 3,
                    "label": "Sweep floors"
                }
            ]),
            headers: {
                "Content-Type": "application/json"
            }
            })
        .then((response) => response.json())
        .then((data) => console.log(data))
    }

    useEffect( () =>{
        fetchInfo();
        modifyTasks();
    }, [])

    function addItemToList(e) {
        if (e.key === "Enter") {
            setAddToList(addToList.concat([items]));
            setItems("");
          }   
    }
    
	return (
            <div className="list">
                <h1>To-Do List</h1>
                <ul>
                    <li><input value={items} type="text" className="form-control" placeholder="To-Do" onChange={(e) => {setItems(e.target.value)}} onKeyDown= {addItemToList}/></li>
                    {addToList.map ((a, index) => (<li onMouseEnter={e => {setShowOnHover({display: "block"});}} onMouseLeave={e => {setShowOnHover({display: "none"})}}>{a}{""}<button className="removeItem" style={showOnHover} onClick={() => setAddToList(addToList.filter ((t, currentIndex) => index != currentIndex))}><FontAwesomeIcon icon={faX} /></button></li>))}
                    {tasks.map((item, index) => (<li key={index} onMouseEnter={e => {setShowOnHover({display: "block"});}} onMouseLeave={e => {setShowOnHover({display: "none"})}}>{ item.label }<button className="removeItem" style={showOnHover} onClick={() => setTasks(tasks.filter ((t, currentIndex) => index != currentIndex))}><FontAwesomeIcon icon={faX} /></button></li>))}
                </ul>
                <p>{addToList.length} items left</p>
                <button className="username" onClick={createUsername}>Create Username</button>
            </div>
	);
};

export default List;