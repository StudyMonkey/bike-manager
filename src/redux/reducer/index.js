import { type } from "./../action";

/* 
* reducer 数据处理
*/

export default (state, action) => {
    switch (action.type) {
        case type.SWITCH_MENU:
            return {
                ...state,
                menuName: action.menuName
            }   
        default:
            return {...state}
    }
}