import { useState, useEffect } from 'react';
import './index.css';
import { FiRefreshCw } from 'react-icons/fi';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import axios from 'axios';
import { Quote } from './Components/Quote';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [mode, setMode] = useState('random'); // random or author
  const [listQuote, setListQuote] = useState([]);

  const getQuote = () => {
    setMode('random');
    axios
      .get('https://quote-garden.herokuapp.com/api/v3/quotes/random')
      .then((res) => {
        let data = res.data.data;
        setQuote(data[0].quoteText);
        setAuthor(data[0].quoteAuthor);
        setGenre(data[0].quoteGenre);
      })
      .catch((err) => console.log(err));
  };

  const getQuoteByAuthor = (author) => {
    setMode('author');
    axios
      .get(
        `https://quote-garden.herokuapp.com/api/v3/quotes?author=${author}&limit=3`
      )
      .then((res) => {
        let data = res.data.data;
        setListQuote(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <div>
      <div className="p-4 sm:w-[80%] sm:mx-auto">
        <div
          className="flex justify-end items-center space-x-4 cursor-pointer"
          onClick={() => getQuote()}
        >
          <FiRefreshCw />
          <p>random</p>
        </div>
        {mode === 'random' && (
          <div className="mx-4 sm:mx-0 mt-10 sm:mt-0 sm:w-[400px] sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 min-h-[80vh]">
            <Quote quote={quote} />
            <button
              className="ml-6 py-4 mt-10 pl-4 pr-10 w-full max-w-[320px] sm:max-w-[400px] text-left flex group hover:bg-gray-800 items-center justify-between"
              onClick={() => getQuoteByAuthor(author)}
            >
              <div className="">
                <p className="text-xl text-gray-800 font-semibold group-hover:text-white">
                  {author}
                </p>
                <p className="capitalize text-gray-500">{genre}</p>
              </div>
              <HiOutlineArrowNarrowRight className="group-hover:text-white" />
            </button>
          </div>
        )}
        {mode === 'author' && (
          <div className='mx-4 sm:mx-0 mt-10 space-y-8 min-h-[80vh]'>
            <p className="mb-10 text-2xl text-center font-bold">{author}</p>
            {listQuote.map(item => {
              return <Quote quote={item.quoteText} key={item._id}/>
            })}
          </div>
        )}
  
      </div>
        <footer className='text-gray-500 font-medium md:absolute bottom-0 left-0 w-full flex justify-center items-center h-[5vh]'>Created By Indrico - devChallenges.io</footer>
    </div>
  );
}

export default App;
