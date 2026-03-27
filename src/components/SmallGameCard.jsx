import React from 'react';

const SmallGameCard = ({ title, image, price, isFree }) => {
  return (
    <div className="small-game-card">
      <div className="sgc-image">
        <img src={image} alt={title} />
      </div>
      <div className="sgc-info">
        <h4 className="sgc-title">{title}</h4>
        <span className="sgc-price">
          {isFree || price === 0 || price === "Free" ? 'Free' : `$${price}`}
        </span>
      </div>
    </div>
  );
};

export default SmallGameCard;
