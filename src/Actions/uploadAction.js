
import * as UploadApi from "../Api/uploadApi"
export const uploadImage = (data, cloud_name) => async (dispatch) => {
  dispatch({ type: "UPLOAD_IMAGE_START" });

  try {
    const response = await UploadApi.uploadImage(data, cloud_name);
    console.log(response.data, "in upload action");
    dispatch({ type: "UPLOAD_IMAGE_SUCCESS", data: response.data });
    return response.data;
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_IMAGE_FAIL" });
  }
};

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