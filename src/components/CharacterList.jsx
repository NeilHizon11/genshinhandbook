import React, { useEffect, useState } from 'react';

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [characterName, setCharacterName] = useState("");
  const [elementType, setElementType] = useState("");
  const [role, setRole] = useState("");
  const [rarity, setRarity] = useState("");
  const [photo_url, setPhoto_Url] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch('http://localhost:8082/api/getAll');
        if (!response.ok) {
          throw new Error("Failed to fetch characters");
        }
        const data = await response.json();
        setCharacters(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const characterInfo = {
      name: characterName,
      element: elementType,
      role: role,
      rarity: rarity,
      photo_url: photo_url
    };
  
    try {
      const response = await fetch('http://localhost:8082/api/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(characterInfo),
      });
  
      const responseText = await response.text();  
      console.log("Response Text:", responseText);  
  
      if (!response.ok) throw new Error("Failed to add character");
  
      const newCharacter = JSON.stringify(responseText);  
      setCharacters(prevCharacters => [...prevCharacters, newCharacter]);
  
      alert('Character added successfully!');
    } catch (err) {
      console.error(err);
      alert(`Failed to add character: ${err.message}`);
    }
  };
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="container col-5">
        <h1>Add Genshin Characters</h1>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="row border">
            <div className="col-lg-12 mb-3 mt-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="nameLabel">Name</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="characterName"
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Element and Role */}
          <div className="row border">
            <div className="col-12 col-lg-6 mb-3 mt-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="elementType">Element Type</label>
                </div>
                <select
                  className="custom-select flex-grow-1"
                  id="elementType"
                  value={elementType}
                  onChange={(e) => setElementType(e.target.value)}
                >
                  <option value="" disabled>Choose...</option>
                  <option value="Pyro">Pyro</option>
                  <option value="Geo">Geo</option>
                  <option value="Dendro">Dendro</option>
                  <option value="Cryo">Cryo</option>
                  <option value="Electro">Electro</option>
                  <option value="Anemo">Anemo</option>
                  <option value="Hydro">Hydro</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-lg-6 mb-3 mt-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="role">Role</label>
                </div>
                <select
                  className="custom-select flex-grow-1"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" disabled>Choose...</option>
                  <option value="DPS">DPS</option>
                  <option value="Sub-DPS">Sub-DPS</option>
                  <option value="Support">Support</option>
                </select>
              </div>
            </div>
          </div>

          {/* Rarity */}
          <div className="row border">
            <div className="col-12 col-lg-6 mb-3 mt-3">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="pic">Photo</label>
                  </div>
                  <select
                    className="custom-select flex-grow-1"
                    id="photo_url"
                    value={photo_url}
                    onChange={(e) => setPhoto_Url(e.target.value)}
                  >
                    <option value="" disabled>Choose...</option>
                    <option value="Portrait">Portrait</option>
                    <option value="Splash-nobg">Splash no Background</option>
                    <option value="Splash">Splash</option>
                  </select>
                </div>
              </div>

            <div className="col-12 col-lg-6 mb-3 mt-3">
              <div className="input-group">
                <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="rarity">Rarity</label>
                </div>
                <select
                  className="custom-select flex-grow-1"
                  id="rarity"
                  value={rarity}
                  onChange={(e) => setRarity(e.target.value)}
                >
                  <option value="" disabled>Choose...</option>
                  <option value="5 Star">5 Star</option>
                  <option value="4 Star">4 Star</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        <div className="border d-flex mt-5 flex-wrap">
          {characters.map((character) => (
            <div key={character.id} className="text-center border col-2  p-2 m-3">
              <p><b>{character.name}</b></p>
              <p>{character.element}</p>
              <p>{character.rarity}</p>
              <p>{character.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
