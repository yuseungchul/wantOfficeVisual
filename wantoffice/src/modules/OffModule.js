import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_OFFS = 'off/GET_OFFS';
export const GET_APP = 'off/GET_APP';
export const POST_OFF = 'off/POST_OFF';
export const GET_OFF_APP = 'off/GET_OFF_APP';
export const GET_OFF = 'off/GET_OFF';

const actions = createActions({
    [GET_OFFS]: () => {},
    [GET_APP]: () => {},
    [POST_OFF]: () => {},
    [GET_OFF_APP]: () => {},
    [GET_OFF]: () => {}
});

/* 리듀서 */
const offReducer = handleActions(
    {
        [GET_OFFS] : (state, { payload }) => {
            return payload;
        },
        [GET_APP] : (state, { payload }) => {
            return payload;
        },
        [POST_OFF] : (state, { payload }) => {
            return payload;
        },
        [GET_OFF_APP] : (state, { payload }) => {
            return payload;
        },
        [GET_OFF] : (state, { payload }) => {
            return payload;
        }
    },
    initialState
);

export default offReducer;