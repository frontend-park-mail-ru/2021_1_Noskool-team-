import { proxy } from 'jsx/store';
import { PlayerStore, CurrentTrack, Expand } from 'types/store/player-store';

const lastTrack: CurrentTrack = JSON.parse(localStorage.getItem('lastTrack')) || {
    link: '/api/v1/data/audio/Do_I_Wanna_Know.ogg',
    img: '/api/v1/data/img/tracks/AM.webp',
    name: 'Do I Wanna Now?',
    artists: [
        {
            'musician_id': 1,
            name: 'Arctic Monkeys',
            description: '',
            picture: '',
        },
    ],
    trackId: 20,
    isFavorite: false,
    isMediateca: false,
    index: 0,
};

export const playerStore = proxy<PlayerStore>({
    currentTrack: proxy<CurrentTrack>({
        index: 0,
        link: lastTrack.link,
        img: lastTrack.img,
        name: lastTrack.name,
        artists: lastTrack.artists,
        trackId: lastTrack.trackId,
        isFavorite: lastTrack.isFavorite,
        isMediateca: lastTrack.isMediateca,
    }),
    isPlay: false,
    volumeIcon: 2,
    volume: 1,
    currentTime: 0,
    durationTime: 0,
    playList: [
        {
            index: 0,
            link: lastTrack.link,
            img: lastTrack.img,
            name: lastTrack.name,
            artists: lastTrack.artists,
            trackId: lastTrack.trackId,
            isFavorite: lastTrack.isFavorite,
            isMediateca: lastTrack.isMediateca,
        },
    ],
});

export const expandStore = proxy<Expand>({
    isExpand: false,
    isExpandPlaylist: false,
});
