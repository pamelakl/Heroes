import React from 'react';
import '../style/all.scss';
import HeroList from './HeroList';

function Main(){
    return (
        <div className='base'>
            <div className='info_bar'></div>
            <HeroList></HeroList>
        </div>
    )
}

export default Main;