import React, { useEffect } from 'react';
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

    useEffect(() => {
        return () => dispatch(clearSearchTerm());
    }, [dispatch]);

    return (
        <form className="SearchTerm">
            <i className="fas fa-search fa-lg SearchTerm__icon"></i>
            <input className="SearchTerm__input" placeholder="Search..." autoFocus="autoFocus" onChange={handleChange} value={searchTerm} />
            {searchTerm && <i className="fas fa-times fa-lg SearchTerm__icon" onClick={handleClick} role="button"></i>}
        </form>
    );
}

export default SearchTerm;