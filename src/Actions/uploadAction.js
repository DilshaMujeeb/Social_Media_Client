
import * as UploadApi from "../Api/uploadApi"
export const uploadImage = (data) => async (dispatch) => {
    console.log("dataaaaaa");
    try {
        await UploadApi.uploadImage(data)
    } catch (error) {
        console.log(error);
    }
}

export const uploadPost = (data) => async (dispatch) => {
    dispatch({type:"UPLOAD_START"})
    try {
        const newPost = await UploadApi.uploadPost(data)
        console.log("newPOst in action",newPost);
        dispatch({type:"UPLOAD_SUCCESS",data:newPost.data})
    } catch (error) {
        console.log(error);
        dispatch({ type: "UPLOAD_FAIL" });
    }
}