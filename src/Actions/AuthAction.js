import * as AuthRequest from "../Api/AuthRequest";

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthRequest.logIn(formData);
    console.log("data in action", data);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    console.log("formData", formData);
    const { data } = await AuthRequest.signUp(formData);
    console.log("data in action", data);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({type:"LOG_OUT"})
}
