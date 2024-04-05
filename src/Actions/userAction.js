
import * as UserApi from "../Api/userRequest"
export const updateUser = (id, formData) => async (dispatch) => {
    dispatch({type:"UPDATING_START"})
    try {
        const { data } = await UserApi.updateUser(id, formData);
        dispatch({type:"UPDATING_SUCCESS",data:data})
    } catch (error) {
        dispatch({ type: "UPDATING_FAIL" });
        console.log(error);
    }
}
// uopdating the user in the backend through api and updating in reducx store through dispatch .. updating in reducer so that we can easily mange the state in the frontend itsself;
export const followUser = (id,data) => async (dispatch) => {
    dispatch({ type: "FOLLOW_USER" })
    UserApi.followUser(id,data)
}

export const unFollowUser = (id, data) => async (dispatch) => {
  dispatch({ type: "UNFOLLOW_USER" });
  UserApi.unFollowUser(id, data);
};