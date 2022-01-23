import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { create } from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import SearchTerm from '../SearchTerm';

const mockStore = configureStore([]);

describe('<SearchTerm />', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            searchTerm: ''
        });
    });

    test('SearchTerm component is defined', () => {
        expect(<SearchTerm />).toBeDefined();
    });
    test('matches the snapshot', () => {
        const component = create(
            <Provider store={store}>
                <SearchTerm />
            </Provider>
        );
        expect(component.toJSON()).toMatchSnapshot();
    });
    test('renders correctly', () => {
        const { container } = render(
            <Provider store={store}>
                <SearchTerm />
            </Provider>
        );
        expect(container.querySelector('.SearchTerm')).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Search/)).toBeInTheDocument();
    });
    test('dispatches correct action when input change occurs', () => {
        render(
            <Provider store={store}>
                <SearchTerm />
            </Provider>
        );
        const input = screen.getByPlaceholderText(/Search/);
        userEvent.type(input, 'c');
        const actions = store.getActions();
        const expectedPayload = {type: 'searchTerm/setSearchTerm', payload: 'c'};
        expect(actions).toEqual([expectedPayload]);
    });
    test('dispatches correct action when clear search button is clicked', () => {
        store = mockStore({
            searchTerm: 'c'
        });
        const { container } = render(
            <Provider store={store}>
                <SearchTerm />
            </Provider>
        );
        const button = container.querySelector('.fa-times');
        userEvent.click(button);
        const actions = store.getActions();
        const expectedAction = {type: 'searchTerm/clearSearchTerm'};
        expect(actions).toEqual([expectedAction]);
    });
    test('does not display clear search button when SearchTerm is falsy', () => {
        render(
            <Provider store={store}>
                <SearchTerm />
            </Provider>
        );
        let button = screen.queryByRole('button');
        expect(button).toBeNull();
        store = mockStore({
            searchTerm: 'c'
        });
        render(
            <Provider store={store}>
                <SearchTerm />
            </Provider>
        );
        button = screen.queryByRole('button');
        expect(button).toBeInTheDocument();
    });
});