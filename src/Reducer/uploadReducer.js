const initialState = {
  loading: false,
  error: null,
  imageUrl: null,
};

const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPLOAD_IMAGE_START":
      return {
        ...state,
        loading: true,
        error: null,
        imageUrl: null,
      };
    case "UPLOAD_IMAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        imageUrl: action.data.secure_url, // Use secure_url instead of url
        error: null,
      };
    case "UPLOAD_IMAGE_FAIL":
      return {
        ...state,
        loading: false,
        error: "Image upload failed",
        imageUrl: null,
      };
    default:
      return state;
  }
};

export default uploadReducer;
 