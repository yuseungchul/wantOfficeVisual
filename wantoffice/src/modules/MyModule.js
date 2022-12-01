import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const GET_MYINFO = 'my/GET_MYINFO';
export const PUT_MYINFO = 'my/PUT_MYINFO';

const actions = createActions({
    [GET_MYINFO]: () => {},
    [PUT_MYINFO]: () => {}
});

const myReducer = handleActions(
    {
        [GET_MYINFO] : (state, { payload }) => {
            return payload;
        },
        [PUT_MYINFO] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default myReducer;