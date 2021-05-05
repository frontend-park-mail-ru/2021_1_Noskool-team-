import { AlbumPage } from 'pages/AlbumPage/AlbumPage';
import { AudioLine } from 'modules/AudioLine/AudioLine';
import { cn } from 'utils/cn';
import { JSX } from 'jsx/jsx';
import { RightMenu } from 'modules/RightMenu/RightMenu';
import { Header } from 'modules/Header';
import { LINKS } from 'constants/links';

import { FavoritePage } from 'pages/FavoritePage/FavoritePage';
import { ErrorPage } from 'pages/ErrorPage';
import { RegistrationPage } from 'pages/RegistrationPage/RegistrationPage';
import { AuthPage } from 'pages/AuthPage/AuthPage';
import { MainPage } from 'pages/MainPage/MainPage';
import { ProfilePage } from 'pages/ProfilePage/ProfilePage';
import { getUser } from 'actions/user/user';
import { PromoutePage } from 'pages/PromoutePage';
import { requestsStore } from 'store/requests.store';
import { Artists } from 'pages/TopArtists';
<<<<<<< HEAD
<<<<<<< HEAD
import { MediatekaPage } from 'pages/Mediateka';
import { Playlists } from 'pages/Playlists';
import { CreatePlaylist } from 'pages/Playlists/CreatePlaylist';
import { Albums } from 'pages/TopAlbums/TopAlbums';
<<<<<<< HEAD
=======
>>>>>>> artist page
=======
import { MediatekaPage } from 'pages/Mediateka';
import { Playlists } from 'pages/Playlists';
import { CreatePlaylist } from 'pages/Playlists/CreatePlaylist';
>>>>>>> MEGA UPDATE
=======
>>>>>>> MEGA FIX

import './app.scss';
import { isMobile } from 'utils/isMobile';
import { rightMenuStore } from 'store/right-menu.store';

const isPageExistsAuth = (): boolean => {
    const path = window.location.pathname;
    return (
        path !== LINKS.main &&
        path !== LINKS.profile &&
        !path.startsWith(LINKS.favorite) &&
        !path.startsWith(LINKS.album) &&
        path !== LINKS.auth &&
        path !== LINKS.reg &&
<<<<<<< HEAD
<<<<<<< HEAD
        path !== LINKS.topArtists &&
        !path.startsWith(LINKS.mediateka) &&
        !path.startsWith(LINKS.playlist) &&
        path !== LINKS.createPlaylist &&
        path !== LINKS.topAlbums
=======
        path !== LINKS.topArtists
>>>>>>> artist page
=======
        path !== LINKS.topArtists &&
        !path.startsWith(LINKS.mediateka) &&
        !path.startsWith(LINKS.playlist) &&
<<<<<<< HEAD
        path !== LINKS.createPlaylist
>>>>>>> MEGA UPDATE
=======
        path !== LINKS.createPlaylist &&
        path !== LINKS.topAlbums
>>>>>>> MEGA FIX
    );
};

const pageWrapper = cn('page-wrapper');

export const App = () => {
    const path = window.location.pathname;
    const isAuth = localStorage.getItem('auth') === 'ok';

    if (requestsStore.profile) {
        requestsStore.profile = false;
        getUser();
    }

    return (
        <div class={pageWrapper('', isMobile() ? 'mob' : '')}>
            <div class={pageWrapper('content')}>
                <div class={pageWrapper('nav-header', rightMenuStore.isExpand ? 'expand' : '')}>
                    <Header />
                </div>
                <div class={pageWrapper('nav-bar')}>
                    <RightMenu />
                </div>
                {!isMobile() ? (
                    <div class={pageWrapper('page')}>
                        {path === LINKS.main && <MainPage />}
                        {path === LINKS.profile && (isAuth ? <ProfilePage /> : <PromoutePage />)}
                        {path.startsWith(LINKS.album) && <AlbumPage />}
                        {path.startsWith(LINKS.favorite) && (isAuth ? <FavoritePage /> : <PromoutePage />)}
                        {isPageExistsAuth() && <ErrorPage />}
                        {path === LINKS.auth && <AuthPage />}
                        {path === LINKS.reg && <RegistrationPage />}
                        {path === LINKS.topArtists && <Artists />}
<<<<<<< HEAD
<<<<<<< HEAD
                        {path.startsWith(LINKS.mediateka) && (isAuth ? <MediatekaPage /> : <PromoutePage />)}
                        {path.startsWith(LINKS.playlist) && (isAuth ? <Playlists /> : <PromoutePage />)}
                        {path === LINKS.createPlaylist && <CreatePlaylist />}
                        {path === LINKS.topAlbums && <Albums />}
=======
>>>>>>> artist page
=======
                        {path.startsWith(LINKS.mediateka) && (isAuth ? <MediatekaPage /> : <PromoutePage />)}
                        {path.startsWith(LINKS.playlist) && (isAuth ? <Playlists /> : <PromoutePage />)}
                        {path === LINKS.createPlaylist && <CreatePlaylist />}
<<<<<<< HEAD
>>>>>>> MEGA UPDATE
=======
                        {path === LINKS.topAlbums && <Albums />}
>>>>>>> MEGA FIX
                    </div>
                ) : (
                    <div />
                )}
                <div class={pageWrapper('player')}>
                    <AudioLine />
                </div>
            </div>
        </div>
    );
};
