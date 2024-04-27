import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getMusic} from "../music/musicReducer";


type Photo = {
    prediction: Prediction,
    isLoading: boolean,
    error: string,
}

export type Prediction = {
    happy: number
    sad: number
    normal: number
    angry: number
}

const initialState: Photo = {
    prediction: {
        happy: 1.0,
        sad: 1.0,
        normal: 1.0,
        angry: 1.0
    },
    isLoading: false,
    error: "",
};

export const uploadPhoto = createAsyncThunk(
    'photo/uploadPhoto',
    async function (photo: File) {
        const formData = new FormData();
        formData.append("file", photo, photo.name);
        return await fetch(`http://127.0.0.1:8000/api/v1/react/uploadPhoto`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => console.log("Response:", response))
            .catch(err => console.log("Error:", err));
    }
);

const photoReducer = createSlice({
    name: "photo",
    initialState,
    reducers: {
        updatePrediction(state, action: PayloadAction<Prediction>) {
            state.prediction = action.payload;
        },
        setErrorMessage(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(uploadPhoto.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadPhoto.fulfilled, (state, action) => {

                state.isLoading = false;
            })
            .addCase(uploadPhoto.rejected, (state) => {
                state.isLoading = false;
            })
    }
});
export const {updatePrediction, setErrorMessage} = photoReducer.actions;
export default photoReducer.reducer;