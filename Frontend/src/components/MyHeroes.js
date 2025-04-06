import React from "react";
import HeroCard from "./HeroCard";
import { useEffect, useState } from "react";
import { userDataInitialState } from "../reducers/loginReducer";
import '../style/cards.scss'
import '../style/heroes.scss'

function MyHeroes(){
    const [heroes, setHeroes] = useState([]);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(() => {
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : userDataInitialState;
    });

    useEffect(()=>{
          setUserData(localStorage.getItem('userData'))
        }, [localStorage.getItem('userData')])

    useEffect(() => {
        if(typeof userData === 'string'){
            setUserData(JSON.parse(userData))
        }
        console.log(typeof userData);
        console.log(userData);
        if (userData && userData._id) {
            fetch(`http://localhost:3000/heroes/${userData._id}`) 
            .then(response => response.json())
            .then(data => {
                setHeroes(data.data.heroes)
            } )
            .catch(error => console.error("Error fetching heroes:", error));
        }
      }, [userData]);

    const trainHero = (id) => {
        setError(null);
        fetch(`http://localhost:3000/heroes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ trained: true }) // Adjust based on your API's expected payload
        
        })
        .then(async (response) => {
            const data = await response.json();

            if (!response.ok) { 
                throw new Error(data.message || `Srever error: ${response.status}`);
            }
            return data;
       })
        .then(data => {
            console.log('Success:', data);
            setHeroes(prevHeroes => 
                prevHeroes.map(hero => 
                    hero._id === id ? { 
                        ...hero,
                        powerLevel:{ 
                            ...hero.powerLevel,
                            currentPower: data.data.hero.powerLevel.currentPower }
                    }
                     : hero
                )
            );
        
        })
        .catch(error => {
            console.dir(error)
            setError(error.message)
        });   
    } 

    return (
        <div>
            <h1>My Heroes</h1>
            <div key={"my-hero-list"} className="hero-list">
                {heroes.map(hero =>  (
                    <div key={hero.id} className="hero-card-container">
                        <HeroCard key={hero._id} hero={hero} />
                        {/* <div>id: {hero._id}</div> */}
                        <div>Colors: {hero.colors}</div>
                        <div>Starting Date: {new Date(hero.startingDate).toISOString().split('T')[0]} </div>
                        <div>Starting Power Level: {hero.powerLevel.startingPower}</div>
                        <div> </div>
                        <div>Power Level: {hero.powerLevel.currentPower}</div>
                        
                        <button onClick={()=>trainHero(hero._id)}>Train Hero</button>
                        
                    </div>
                ))}
            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
    
}

export default MyHeroes;