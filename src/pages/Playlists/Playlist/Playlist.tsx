import { JSX } from 'jsx/jsx';
import {
    getOnePlaylist,
    changePlaylistPhoto,
    changeName,
    changeDescription,
    deletePlaylist,
    deleteTrackPlaylist,
    addPlaylistToMy,
} from 'actions/playlist/playlist';
import { TRACK_HOST } from 'constants/api';
import { cn } from 'utils/cn';
import { PlaylistInput } from 'components/PlaylistInput';
import { onePlaylistStore, playlistEditForm, playlistForm, playlistStore } from 'store/playlist.store';
import { profileStore } from 'store/profile.store';
import { TrackTable } from 'components/Table';
import { isMobile } from 'utils/isMobile';
import { playerStore } from 'store/player.store';
import { onClickPlay } from 'modules/AudioLine/AudioLine';
import { PlayMainTrackIcon, TrashIcon } from 'assets/icons';
import { toCurrentTrack } from 'utils/cast';
import { redirectTo, render } from 'utils/render';
import { LINKS } from 'constants/links';
import { requestsStore } from 'store/requests.store';

import './style.scss';
import { OkeyIcon } from 'assets/icons';

const playlistPage = cn('playlist-page');

let previosId: number;

const isClickAddFavourites = (id: number) => {
    const buffer = [...onePlaylistStore.playlist.tracks];
    buffer[id].in_mediateka = true;
    buffer[id].in_favorite = true;
    onePlaylistStore.playlist.tracks = [...buffer];
    render();
};

const isClickDeleteFavourites = (id: number) => {
    const buffer = [...onePlaylistStore.playlist.tracks];
    buffer[id].in_favorite = false;
    onePlaylistStore.playlist.tracks = buffer;
    render();
};

const isClickAddMediateca = (id: number) => {
    const buffer = [...onePlaylistStore.playlist.tracks];
    buffer[id].in_mediateka = true;
    onePlaylistStore.playlist.tracks = buffer;
    render();
};

const isClickDeleteMediateca = (id: number) => {
    const buffer = [...onePlaylistStore.playlist.tracks];
    buffer[id].in_favorite = false;
    buffer[id].in_mediateka = false;
    onePlaylistStore.playlist.tracks = buffer;
    render();
};

const isClickDeleteTrackPlaylist = (id: number) => {
    deleteTrackPlaylist(onePlaylistStore.playlist.playlist_id, id).then(() => {
        const buffer = onePlaylistStore.playlist.tracks.filter(({ track_id }) => track_id !== id);
        onePlaylistStore.playlist.tracks = buffer;
        render();
    });
};

const isClickDeletePlaylist = () => {
    deletePlaylist(onePlaylistStore.playlist.playlist_id).then(() => {
        const buffer = playlistStore.albumList.filter(
            ({ playlist_id }) => playlist_id !== onePlaylistStore.playlist.playlist_id
        );
        playlistStore.albumList = buffer;
        render();
        redirectTo(LINKS.myPlaylists);
    });
};

const isClickAddPlaylist = () => {
    addPlaylistToMy(onePlaylistStore.playlist.playlist_id).then(() => {
        const newPlaylist = {
            playlist_id: onePlaylistStore.playlist.playlist_id,
            tittle: onePlaylistStore.playlist.tittle,
            description: onePlaylistStore.playlist.description,
            picture: onePlaylistStore.playlist.picture,
            release_date: onePlaylistStore.playlist.release_date,
            user_id: String(profileStore.profile.id),
            tracks: onePlaylistStore.playlist.tracks,
            isOkey: onePlaylistStore.playlist.isOkey,
            uid: onePlaylistStore.playlist.uid,
            isCopyLink: onePlaylistStore.playlist.isCopyLink,
        };
        playlistStore.albumList.push(newPlaylist);
        document.getElementById('addPlaylist').style.display = 'flex';
        setTimeout(function () {
            document.getElementById('addPlaylist').style.display = 'none';
        }, 5000);
        render();
    });
};

const onClickTrack = () => {
    const trackList = toCurrentTrack(onePlaylistStore.playlist.tracks);
    playerStore.playList = trackList;
    playerStore.currentTrack = trackList[0];
    playerStore.currentTime = 0;

    if (!playerStore.isPlay) {
        onClickPlay();
    } else {
        onClickPlay();
        onClickPlay();
    }
};

const onClickUser = (id: number) => () => {
    redirectTo(LINKS.user + `/${id}`);
};

export const Playlist = () => {
    const ID_IMAGE_INPUT = 'ID_IMAGE_INPUT';
    const id = window.location.pathname.split('/');

    if (requestsStore.onePlaylist) {
        requestsStore.onePlaylist = false;
        getOnePlaylist(id[id.length - 1]);
    }

    if (Number(id[id.length - 1]) !== previosId) {
        previosId = Number(id[id.length - 1]);
        getOnePlaylist(id[id.length - 1]);
    }

    const onChacngePhoto = (id: string) => (e: MouseEvent) => {
        changePlaylistPhoto(e.target, id).then(() => {
            render();
        });
    };

    const onClickLabel = () => {
        (document.getElementById(ID_IMAGE_INPUT) as HTMLInputElement).click();
    };

    const saveName = () => {
        if (playlistForm.name.value !== playlistEditForm.form.name.value) {
            const body = {
                tittle: playlistEditForm.form.name.value,
            };
            if (!playlistEditForm.form.name.value) {
                delete body.tittle;
            }
            changeName(onePlaylistStore.playlist.playlist_id, body).then(() => {
                playlistForm.name.value = playlistEditForm.form.name.value;
            });
        }
    };

    const saveDescription = () => {
        if (playlistForm.description.value !== playlistEditForm.form.description.value) {
            const body = {
                description: playlistEditForm.form.description.value,
            };
            if (!playlistEditForm.form.description.value) {
                delete body.description;
            }
            changeDescription(onePlaylistStore.playlist.playlist_id, body).then(() => {
                playlistForm.description.value = playlistEditForm.form.description.value;
            });
        }
    };

    const onClickShare = () => {
        const link = document.getElementById('link') as HTMLInputElement;
        link.select();
        document.execCommand('copy');
        onePlaylistStore.playlist.isCopyLink = true;
        setTimeout(function () {
            document.getElementById('statusShare').style.display = 'none';
        }, 5000);
    };

    return (
        <div class={playlistPage('', isMobile() ? 'mob' : '')}>
            <div class={playlistPage('header')}>
                <div class={playlistPage('photo')}>
                    <input
                        type='file'
                        id={ID_IMAGE_INPUT}
                        accept={'image/jpeg,image/png,image/webp,image/gif'}
                        onchange={onChacngePhoto(String(onePlaylistStore.playlist.playlist_id))}
                    />
                    <label htmlFor={ID_IMAGE_INPUT} onclick={onClickLabel} class={playlistPage('change-photo')}>
                        <img
                            src={TRACK_HOST + onePlaylistStore.playlist.picture}
                            alt=''
                            class={playlistPage('image')}
                        />
                    </label>
                </div>
                <div class={playlistPage('information')}>
                    <div class={playlistPage('name')}>ПЛЕЙЛИСТ</div>
                    <PlaylistInput
                        input={playlistEditForm.form.name}
                        placeholder={'Измените название'}
                        validators={[]}
                        initialName={onePlaylistStore.playlist.tittle}
                        disabled={Boolean(onePlaylistStore.playlist.user_id !== String(profileStore.profile.id))}
                        onblur={saveName}
                    />
                    <PlaylistInput
                        input={playlistEditForm.form.description}
                        placeholder={'Измените описание'}
                        validators={[]}
                        disabled={Boolean(onePlaylistStore.playlist.user_id !== String(profileStore.profile.id))}
                        initialName={onePlaylistStore.playlist.description}
                        onblur={saveDescription}
                        className={'-description'}
                    />
                    <div class={playlistPage('author')} onclick={onClickUser(profileStore.profile.id)}>
                        {profileStore.profile.login}
                    </div>
                    <div class={playlistPage('icons-playlist')}>
                        <div class={playlistPage('play-playlist')}>
                            <div class={playlistPage('listen')} onclick={onClickTrack}>
                                Слушать
                            </div>
                            <PlayMainTrackIcon />
                        </div>
                        <div class={playlistPage('share')} onclick={onClickShare}>
                            Поделиться
                        </div>
                        <input
                            type='text'
                            id='link'
                            readonly
                            value={'noskool-music.ru' + LINKS.playlistShare + '/' + onePlaylistStore.playlist.uid}
                        ></input>
                        {profileStore.profile.id !== Number(onePlaylistStore.playlist.user_id) && (
                            <div class={playlistPage('like-palylist')} onclick={isClickAddPlaylist}>
                                Добавить к себе
                            </div>
                        )}
                        {profileStore.profile.id === Number(onePlaylistStore.playlist.user_id) && (
                            <div class={playlistPage('delete-playlust')} onclick={isClickDeletePlaylist}>
                                <TrashIcon />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div class={playlistPage('content')}>
                {onePlaylistStore.playlist.tracks.length === 0 ? (
                    <div class={playlistPage('empty-playlist')}>
                        <div class={playlistPage('empty')} />
                        <div class={playlistPage('text')}>Ваш плейлист пуст</div>
                    </div>
                ) : (
                    <TrackTable
                        trackList={toCurrentTrack(onePlaylistStore.playlist.tracks)}
                        isNeedHeader={false}
                        isNeedPhoto={true}
                        isForPlaylist={true}
                        isNotWhite
                        canDeleteTrack={profileStore.profile.id === Number(onePlaylistStore.playlist.user_id)}
                        updateAddFavourites={isClickAddFavourites}
                        updateAddMediateca={isClickAddMediateca}
                        updateDeleteFavourites={isClickDeleteFavourites}
                        updateDeleteMediateca={isClickDeleteMediateca}
                        updateDeleteTrackPlaylist={isClickDeleteTrackPlaylist}
                    />
                )}
                <div class={playlistPage('changeStatus')} id='addPlaylist'>
                    <OkeyIcon />
                    <div class={playlistPage('isOkey')}>{'Плейлист добавлен'}</div>
                </div>
                {onePlaylistStore.playlist.isCopyLink ? (
                    <div class={playlistPage('changeStatus')} id='statusShare'>
                        <OkeyIcon />
                        <div class={playlistPage('isOkey')}>{'Cсылка скопирована'}</div>
                    </div>
                ) : (
                    <div />
                )}
            </div>
        </div>
    );
};
