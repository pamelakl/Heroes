import React from "react";
import HeroCard from "./HeroCard";
import { useEffect, useState } from "react";
import '../style/cards.scss'
import '../style/heroes.scss'
import { IoIosAddCircleOutline } from "react-icons/io";
import { userDataInitialState } from "../reducers/loginReducer";
import { useNavigate } from "react-router-dom";


function HeroList(){
    const [heroes, setHeroes] = useState([]);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(() => {
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : userDataInitialState;
    });

    useEffect(()=>{
      setUserData(localStorage.getItem('userData'))
      console.log(userData)
      if(userData === null){
        navigate("/connect");
      }
    }, [localStorage.getItem('userData')])

    useEffect(() => {
        fetch("http://localhost:3000/heroes") // Adjust URL to match your backend
          .then(response => response.json())
          .then(data => 
            {   
                console.log(data.data.heroes)
                setHeroes(data.data.heroes);
            })
          .catch(error => console.error("Error fetching heroes:", error));
      }, []);

    const fetchHeroes = () => {
      fetch("http://localhost:3000/heroes")
          .then(response => response.json())
          .then(data => {
              console.log(data.data.heroes);
              setHeroes(data.data.heroes);
          })
          .catch(error => console.error("Error fetching heroes:", error));
    };

    const addHero = async (hero) => {
      const parsedUserData = JSON.parse(userData);
        console.log( typeof parsedUserData)
        console.log(parsedUserData)
        console.log(userData._id)
        if(userData){
            try {
                const response = await fetch(`http://localhost:3000/users/${parsedUserData._id}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(hero), // Convert JS object to JSON
                });
            
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
            
                const data = await response.json();
                console.log("Hero added successfully:", data);
                fetchHeroes();
          
              } catch (error) {
                console.error("Error adding hero:", error);
              }
        }
    }

    return(
        <div>
            <div key={'cards-title'} className="cards-title">Hero Cards</div>
            <div key={'hero-list'} className="hero-list">
                {heroes.map(hero =>
                    <div key={hero._id} className="hero-card-container">
                        <HeroCard hero={hero} />
                        {hero.owner == null && (
                        <IoIosAddCircleOutline className="plus-button" size={23} onClick={() => addHero(hero)} />
                    )}
                    </div>
                )} 
            </div>
        </div>
    )
    
}

export default HeroList;