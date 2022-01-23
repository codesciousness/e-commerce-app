//import { Reducer, Selector } from 'redux-testkit';
import configureStore from 'redux-mock-store';
import Immutable from 'seamless-immutable';
import searchTermReducer, { setSearchTerm, clearSearchTerm, selectSearchTerm } from '../searchTermSlice';

const mockStore = configureStore([]);

describe('searchTermReducer', () => {
    const initialState = '';
    const existingState = 'c';
    const nextState = 'co';

    test('returns initial state when an empty or undefined action is dispatched', () => {
        expect(searchTermReducer(undefined, {})).toEqual(initialState);
        expect(searchTermReducer(undefined, {type: 'undefined'})).toEqual(initialState);
    });
    test('returns correct state when setSearchTerm action is dispatched', () => {
        expect(searchTermReducer(initialState, {type: 'searchTerm/setSearchTerm', payload: 'c'})).toEqual(existingState);
        expect(searchTermReducer(existingState, {type: 'searchTerm/setSearchTerm', payload: 'co'})).toEqual(nextState);
    });
    test('returns correct state when clearSearchTerm action is dispatched', () => {
        expect(searchTermReducer(initialState, {type: 'searchTerm/clearSearchTerm'})).toEqual(initialState);
        expect(searchTermReducer(existingState, {type: 'searchTerm/clearSearchTerm'})).toEqual(initialState);
    });
});

describe('Action Handlers', () => {
    let store;
    
    beforeEach(() => {
        store = mockStore({
            searchTerm: ''
        });
    });

    describe('setSearchTerm', () => {
        test('generates the correct action to set the searchTerm with initial state', () => {
            store.dispatch(setSearchTerm('c'));
            const actions = store.getActions();
            const expectedAction = {type: 'searchTerm/setSearchTerm', payload: 'c'};
            expect(actions).toEqual([expectedAction]);
        });
        test('generates the correct action to set the searchTerm with existing state', () => {
            store = mockStore({
                searchTerm: 'c'
            });
            store.dispatch(setSearchTerm('co'));
            const actions = store.getActions();
            const expectedAction = {type: 'searchTerm/setSearchTerm', payload: 'co'};
            expect(actions).toEqual([expectedAction]);
        });
    });
    
    describe('clearSearchTerm', () => {
        test('generates the correct action to clear the searchTerm', () => {
            store = mockStore({
                searchTerm: 'covid'
            });
            store.dispatch(clearSearchTerm());
            const actions = store.getActions();
            const expectedAction = {type: 'searchTerm/clearSearchTerm'};
            expect(actions).toEqual([expectedAction]);
        });
    });
});

describe('Selector', () => {
    const emptyState = Immutable({
        searchTerm: ''
    });
    const fullState = Immutable({
        searchTerm: 'covid'
    });

    describe('selectSearchTerm', () => {
        test('selects searchTerm slice of state', () => {
            expect(selectSearchTerm(emptyState)).toEqual('');
            expect(selectSearchTerm(fullState)).toEqual('covid');
        });
    });
});