

const ConfettiRain = () => {
  const createConfetti = () => {
    const confetti = [];
    for (let i = 0; i < 100; i++) {
      confetti.push(
        <div
          key={i}
          className="confetti"
          style={{
            left: `${Math.random() * 100}vw`,
            animationDelay: `${Math.random() * 2}s`,
            backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
          }}
        ></div>
      );
    }
    return confetti;
  };

  return <div className="confetti-container">{createConfetti()}</div>;
};

export default ConfettiRain;