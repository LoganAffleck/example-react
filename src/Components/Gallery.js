// import react from React;
import { useState, useEffect } from "react";
import "./gallery.css";

function Gallery() {
  let [gifs, setGifs] = useState([]);
  let [search, setSearch] = useState("cats");
  let [searchInput, setSearchInput] = useState("cats");
  let [offset, setOffset] = useState(0);

  let URL = "https://api.giphy.com/v1/gifs/search?";
  let API_KEY = "jVm27hYYbzUws9wzsV9mn1wWRSW33B2E";

  let limit = 12;

  let queryParams = new URLSearchParams({
    api_key: API_KEY,
    q: search,
    limit: 12,
    offset: offset,
  });

  async function fetchGifs() {
    const results = await fetch(URL + queryParams.toString());
    return results.json();
  }

  useEffect(() => {
    fetchGifs().then((data) => {
      setGifs(
        data.data.map((gif) => {
          return gif.images.original.url;
        })
      );
    });
  }, [search, offset]);

  return (
    <>
    <input type="text" value={searchInput} 
    onChange={e => setSearchInput(e.target.value)}></input>
    <button onClick={() => {
        setSearch(searchInput)
        setOffset(0)
        }}> Search </button>
      <div className="gallery">
        {gifs.map((gif, index) => {
          return <img key={index} src={gif} alt="gif" width="400px" />;
        })}
      </div>
      { offset > 0 ? ( <button onClick={()=>{
        offset < limit ? setOffset(0) :
        setOffset(offset-=limit)
        }}>Previous Page</button>) : (null)
    }
     
      <button onClick={()=>{setOffset(offset+=limit)}}>Next Page</button>
    </>
  );
}

export default Gallery;
