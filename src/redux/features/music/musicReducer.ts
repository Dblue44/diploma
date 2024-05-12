import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {uploadPhoto} from "../photo/photoReducer";

export type TMusicTrack = {
    id: string,
    artist: string,
    trackName: string,
    photoId: string,
    src?: string,
}

type Music = {
    currentTrack?: TMusicTrack,
    musicList: TMusicTrack[],
    isLoadingMusic: boolean,
}

const initialState: Music = {
    isLoadingMusic: false,
    musicList: []
};

export const getMusic = createAsyncThunk<{ musicId: string, src: string }, string>(
    'music/getMusic',
    async function (musicId: string) {
        return await fetch(`http://${process.env.REACT_APP_BACKEND_URL}/api/v1/react/music?musicId=${musicId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/octet-stream',
            },
        })
            .then(async (response) => {
                if (response.status === 200) {
                    const blob = new Blob([await response.blob()], {
                        type: 'audio/mp3'
                    });
                    return {
                        musicId: musicId,
                        src: window.URL.createObjectURL(blob)
                    }
                }
                return {
                    musicId: musicId,
                    src: ""
                }
            });
    }
);

const musicReducer = createSlice({
    name: "music",
    initialState,
    reducers: {
        addMusic(state, action: PayloadAction<TMusicTrack[]>) {
            for (let i: number = 0; i < action.payload.length; i++) {
                state.musicList.push(action.payload[i]);
            }
        },
        updateCurrentTrack(state, action: PayloadAction<TMusicTrack>) {
            state.currentTrack = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMusic.pending, (state) => {
                state.isLoadingMusic = true;
            })
            .addCase(getMusic.fulfilled, (state, action) => {
                if (action.payload.src) {
                    const currentTrackId = state.musicList.findIndex((music) => music.id === action.payload.musicId);
                    state.musicList[currentTrackId].src = action.payload.src;
                    if (state.currentTrack) {
                        state.currentTrack.src = action.payload.src;
                    }
                    state.isLoadingMusic = false;
                }

            })
            .addCase(getMusic.rejected, (state) => {
                state.isLoadingMusic = false;
            })
        builder.addCase(uploadPhoto.fulfilled, (state, action) => {
            if (action.payload?.music) {
                state.musicList = action.payload.music
            }
        })
    }
});
export const {addMusic, updateCurrentTrack} = musicReducer.actions;
export default musicReducer.reducer;