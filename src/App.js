import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';
import Alert from './alert';

const cardImages = [
  { src: "/img/img1.jpg", matched: false },
  { src: "/img/img2.jpg", matched: false },
  { src: "/img/img3.jpg", matched: false },
  { src: "/img/img4.jpg", matched: false },
  { src: "/img/img5.jpg", matched: false },
  { src: "/img/img6.jpg", matched: false },
  { src: "/img/img7.jpg", matched: false },
  { src: "/img/img8.jpg", matched: false }
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setMatchedPairs(0);
    setDisabled(false);
  };

  const handleChoice = (card) => {
    if (!disabled && (choiceOne === null || choiceTwo === null)) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          const updatedCards = prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
          setMatchedPairs(prevMatchedPairs => prevMatchedPairs + 1);
          return updatedCards;
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  const renderMessage = () => {
    if (cards.every((card) => card.matched || card.flipped)) {
      return (
        <Alert 
          message="Felicitări! Ai terminat jocul!"
          variant="success"
        />
      );
    }
    return null;
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Match the cards</h1>
      <button onClick={shuffleCards}>New Game</button>

      {/* Afiseaza mesajul de felicitare */}
      {renderMessage()}

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
