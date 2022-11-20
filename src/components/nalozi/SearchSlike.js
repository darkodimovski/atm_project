import React, { useState, useEffect } from 'react'
import axios from 'axios';

const pictureUrl = `http://localhost:1337/api/pictures?populate=*`;

export const SearchSlike = () => {
  const [query, setQuery] = useState('');
  const [slike, setSlike] = useState([]);


  useEffect(() => {
    const getPictures = async () => {
      await axios.get(pictureUrl).then((res) => {
        let atmPictures = res.data.data;
        setSlike(atmPictures)
      });
    };
    getPictures();
  }, []);


  return (
    <div>
      <input 
        type="text" 
        name="slike"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder='Pretraži slike'
        onChange={e => setQuery(e.target.value)}
      />
      <div>
        { slike.filter(pic => pic.attributes.Naziv.toLowerCase().includes(query)).map(slika => {
          return (
            <div key={slika.id} className='text-white'>{slika.attributes.Naziv}</div> 
          )
        })}
      </div>
    </div>
  )
}
