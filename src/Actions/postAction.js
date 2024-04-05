import * as PostApi from '../Api/PostRequest'

export const getTimelinePosts = (id) => async (dispatch) => {
    dispatch({ type: "RETREIVING_START" })
    try {
        const { data } = await PostApi.getTimelinePosts(id);
        dispatch({ type: "RETREIVING_SUCCESS", data:data });
    } catch (error) {
        dispatch({ type: "RETREIVING_FAIL" });
        console.log(error);
    }
}
export const likePost = (dataId, userId) => async (dispatch) => {
    try {
        const { response } = await PostApi.likePost(dataId, userId);
        console.log("res in action",response);
        dispatch({ type: "LIKE_POST", data: response });
    } catch (error) {
        console.log(error);
    }
    
}