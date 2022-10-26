import './SearchInput.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const navigate = useNavigate();
    const [keyWord, setKeyWord] = useState('');

    const onSearch = (e) => {
        if (keyWord.trim().length != 0) {
            navigate(`/search?q=${keyWord}&page=1`)
        } else {
            e.preventDefault();
        }
    }

    function handleSearchClick(e) {
        onSearch(e);
        setKeyWord('');
        // navigate(`/search?q=${keyWord}&page=1`)
    }

    function handleSearchEnter(e) {
        if (e.key === 'Enter') {
            onSearch(e);
            setKeyWord('');
        }
    }


    return (
        <div className='search-input'>
            <input onKeyDown={(e) => { handleSearchEnter(e) }} value={keyWord} onChange={e => setKeyWord(e.target.value)} placeholder='Search...' type='text'></input>
            <div className='icon flex-row ' onClick={(e) => handleSearchClick(e)}>
                <i className='bx bx-search-alt-2 flex-row'></i>
            </div>
        </div>
    )
}

export default SearchInput;
