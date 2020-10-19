import reducer from './auth';

import * as actionTypes from '../actions/actionType';

describe('auth reducer', () => {
    it('should return the inital state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });   
    });

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'asdwdsd',
            userId: 'someid' 
        })).toEqual({
            token: 'asdwdsd',
            userId: 'someid',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
});