import React, { useState } from 'react';

function SuggestPrice() {
  const [carName, setCarName] = useState('');
  const [year, setYear] = useState('');
  const [suggestedPrice, setSuggestedPrice] = useState(null);

  const handleSuggest = async () => {
    // Placeholder for AI integration
    // Replace with actual API call later
    setSuggestedPrice(`Estimated price for ${carName} (${year}): $22,000`);
  };

  return (
    <div>
      <h3>AI-Powered Price Suggestion</h3>
      <input
        type="text"
        placeholder="Car Name"
        value={carName}
        onChange={e => setCarName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={e => setYear(e.target.value)}
      />
      <button onClick={handleSuggest}>Suggest Price</button>
      {suggestedPrice && <div>{suggestedPrice}</div>}
    </div>
  );
}

export default SuggestPrice;