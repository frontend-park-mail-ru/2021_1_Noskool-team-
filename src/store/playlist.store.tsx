import { proxy } from 'jsx/store';
import { Playlist } from 'types/requests/playlist';
import { AllPlaylists, OnePlaylist, CreatePlaylist } from 'types/store/playlist';
import { FieldState } from 'types/common';

export const playlistStore = proxy<AllPlaylists>({
    albumList: proxy<Playlist>([]),
});

// export const onePlaylistStore = proxy<OnePlaylist>({
//     playlist: proxy<Playlist>([]),
// });

export const onePlaylistStore = proxy<OnePlaylist>({
    album: proxy<Playlist>({
        'playlist_id': 1,
        tittle: '',
        description: '',
        picture: '',
        'release_date': '',
        'user_id': '',
        tracks: [],
    }),
});

export const createPlaylistStore = proxy<CreatePlaylist>({
    tittle: '',
    description: '',
    picture: '',
    'release_date': '',
});

export interface PlaylistForm {
    description: FieldState;
    name: FieldState;
}

export interface playlistFormAdd {
    description: string;
    name: string;
    photo: string;
}

export const playlistProfileStore = {
    playlistprops: proxy<playlistFormAdd>({
        name: '',
        description: '',
        photo: '',
    }),
};

export const playlistForm = proxy<PlaylistForm>({
    name: proxy<FieldState>(
        {
            value: '',
            isValid: null,
            onCheckValid: undefined,
            isFocuse: false,
            errorMsg: '',
        },
        ['onCheckValid']
    ),
    description: proxy<FieldState>(
        {
            value: '',
            isValid: null,
            onCheckValid: undefined,
            isFocuse: false,
            errorMsg: '',
        },
        ['onCheckValid']
    ),
});