import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SearchTerm.css';
import { setSearchTerm, clearSearchTerm, selectSearchTerm } from './searchTermSlice';

const SearchTerm = () => {
    const searchTerm = useSelector(selectSearchTerm);
    const dispatch = useDispatch();

    const handleChange = ({ target }) => {
        dispatch(setSearchTerm(target.value));
    };

    const handleClick = () => {
        dispatch(clearSearchTerm());
    };

    return (
        <form className="SearchTerm">
            <span className="SearchTerm__icon"><i className="fas fa-search fa-lg"></i></span>
            <input className="SearchTerm__input" placeholder="Search..." autoFocus="autoFocus" onChange={handleChange} value={searchTerm} />
            {searchTerm && <span className="SearchTerm__icon button"><i className="fas fa-times fa-lg" onClick={handleClick} role="button"></i></span>}
        </form>
    );
}

export default SearchTerm;