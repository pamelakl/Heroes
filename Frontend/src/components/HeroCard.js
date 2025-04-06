import React from "react";
import SupermanImage from '../uploads/Superman.webp'
import BatmanImage from '../uploads/Batman.webp'
import WonderWomanImage from '../uploads/Wonder_Woman.webp'
import '../style/cards.scss'
import '../style/heroes.scss'
//import Superman from '.../public/Superman.webp'

const heroToImageMap = {
  "Superman": SupermanImage,
  "Batman": BatmanImage,
  "Wonder Woman": WonderWomanImage
}


const HeroCard = ({ hero }) => {
  return (
    <div className="hero-card">
      <img src={heroToImageMap[hero.heroName]} alt={hero.name} className="hero-image" />
      <h2 className="hero-name">{hero.name}</h2>
      <p className="hero-power">{hero.power}</p>
    </div>
  );
};

export default HeroCard;