import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TMusicTrack} from "../music/musicReducer";


type Photo = {
    prediction: Prediction,
    isLoading: boolean,
    error: string,
}

type TBackendResponse = {
    music?: TMusicTrack[],
    prediction?: Prediction,
    error?: string
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

export const uploadPhoto = createAsyncThunk<TBackendResponse | void, File>(
    'photo/uploadPhoto',
    async function (photo: File) {
        const formData = new FormData();
        formData.append("file", photo, photo.name);
        return await fetch(`http://158.160.164.49:8085/api/v1/react/uploadPhoto`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
                return {error: "Лица на фотографии не найдены"}
            })
            .then((response: TBackendResponse) => {
                return response
            })
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
                if (action.payload?.error) {
                    state.error = action.payload.error
                } else if (action.payload?.prediction){
                    state.prediction = action.payload.prediction
                    state.error = ""
                }
                state.isLoading = false;
            })
            .addCase(uploadPhoto.rejected, (state) => {
                state.isLoading = false;
            })
    }
});
export const {updatePrediction, setErrorMessage} = photoReducer.actions;
export default photoReducer.reducer;