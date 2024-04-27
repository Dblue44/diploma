import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

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
    musicList: [
        {
            id: "1",
            artist: "АРТИСТ",
            trackName: "ТРЕК",
            photoId: "file_png",
        },
        {
            id: "2",
            artist: "АРТИСТ2",
            trackName: "ТРЕК3",
            photoId: "file_png"
        },
        {
            id: "3",
            artist: "АРТИСТ2",
            trackName: "ТРЕК3",
            photoId: "file_png"
        },
        {
            id: "4",
            artist: "АРТИСТ2",
            trackName: "ТРЕК3",
            photoId: "file_png"
        },
        {
            id: "5",
            artist: "АРТИСТ2",
            trackName: "ТРЕК3",
            photoId: "file_png"
        },
        {
            id: "6",
            artist: "АРТИСТ2",
            trackName: "ТРЕК3",
            photoId: "file_png"
        },
        {
            id: "7",
            artist: "АРТИСТ2",
            trackName: "ТРЕК3",
            photoId: "file_png"
        },
        {
            id: "8",
            artist: "АРТИСТ2",
            trackName: "ТРЕК3",
            photoId: "file_png"
        },
        {
            id: "9",
            artist: "АРТИСТ2",
            trackName: "ТРЕК3",
            photoId: "file_png"
        },
        {
            id: "10",
            artist: "АРТИСТ2",
            trackName: "ТРЕК3",
            photoId: "file_png"
        }
    ]
};

export const getMusic = createAsyncThunk<{ musicId: string, src: string }, string>(
    'music/getMusic',
    async function (musicId: string) {
        return await fetch(`http://127.0.0.1:8000/api/v1/react/music?musicId=${musicId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'audio/mpeg',
            },
        })
            .then((response) => response.blob())
            .then((blob) => {
                return {musicId: musicId, src: URL.createObjectURL(blob)};
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
                const currentTrackId = state.musicList.findIndex((music) => music.id === action.payload.musicId);
                state.musicList[currentTrackId].src = action.payload.src;
                if (state.currentTrack) {
                    state.currentTrack.src = action.payload.src;
                }
                state.isLoadingMusic = false;
            })
            .addCase(getMusic.rejected, (state) => {
                state.isLoadingMusic = false;
            })
    }
});
export const {addMusic, updateCurrentTrack} = musicReducer.actions;
export default musicReducer.reducer;