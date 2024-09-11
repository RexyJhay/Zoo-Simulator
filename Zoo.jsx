import React, { useState, useEffect } from 'react';
import monkeyImage from './monkey.jpeg';
import giraffeImage from './giraffe.jpeg';
import elephantImage from './elephant.jpeg';

function Zoo() {
  const [animals, setAnimals] = useState({
    monkeys: Array(5).fill({ health: 100, image: monkeyImage }),
    giraffes: Array(5).fill({ health: 100, image: giraffeImage }),
    elephants: Array(5).fill({ health: 100, image: elephantImage }),
  });
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds + 1);
      if (seconds >= 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
      if (minutes >= 59) {
        setHours(hours + 1);
        setMinutes(0);
      }
      // Decrease animal health by 5% every second
      Object.keys(animals).forEach((animalType) => {
        animals[animalType].forEach((animal) => {
          animal.health -= animal.health * 0.05;
        });
      });
      setAnimals({ ...animals });
    }, 1000); // 1 second
    return () => clearInterval(interval);
  }, [seconds, minutes, hours, animals]);
  
  const handleTimeClick = () => {
    setHours(hours + 1);
    setMinutes(0);
    setSeconds(0);
    passTime();
  };

  const passTime = () => {
    Object.keys(animals).forEach((animalType) => {
      animals[animalType].forEach((animal, index) => {
        const healthReduction = Math.random() * 20;
        animal.health -= animal.health * (healthReduction / 100);
        if (animalType === 'elephants' && animal.health < 20 && hours > 0) {
          animal.health = 0; // Elephant dies if health doesn't recover above 70%
        } else if (animalType === 'monkeys' && animal.health < 10) {
          animal.health = 0; // Monkey dies if health goes below 30%
        } else if (animalType === 'giraffes' && animal.health < 10) {
          animal.health = 0; // Giraffe dies if health goes below 50%
        }
      });
    });
    setAnimals({ ...animals });
  };

  const feedZoo = () => {
    Object.keys(animals).forEach((animalType) => {
      const healthIncrease = Math.random() * 15 + 10;
      animals[animalType].forEach((animal) => {
        animal.health = Math.min(100, animal.health + (healthIncrease * animal.health) / 100);
      });
    });
    setAnimals({ ...animals });
  };

  return (
    <div className=" grid place-items-center gap-5 bg-orange-300">
      <h1 className="text-4xl font-bold text-white">Zoo Simulator</h1>
      <div className=' flex justify-around w-[100%]'>
        <section className=' flex gap-5'>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleTimeClick}>Pass Time</button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={feedZoo}>Feed Zoo</button>
        </section>
        
        <p className="font-bold text-2xl">Time: {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</p>
      </div>
      
      <div className="grid grid-cols-3 gap-20">
        {Object.keys(animals).map((animalType, rowIndex) => (
          <div key={rowIndex} className="grid grid-rows-5 gap-4">
            {animals[animalType].map((animal, columnIndex) => (
              <div key={columnIndex} className="flex flex-col justify-center">
                <img src={animal.image} alt={animalType} className="w-50 h-40" />
                <p className="text-lg">Health: {animal.health.toFixed(2)}%</p>
                {animal.health === 0 ? <p className="text-red-500">(Dead)</p> : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Zoo;