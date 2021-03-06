import { JSX } from 'jsx/jsx';
import RightMenu from '../../components/RightMenu/rightMenu';
import HeaderButtons from '../../components/headerButtons/HeaderButtons';

import './style.scss';

export const AlbumPageForm = () => {
    return (
        <div class='main-page'>
            <RightMenu />
            <div class='main'>
                <div class='header'>
                    <HeaderButtons />
                </div>
                <div class='album'>
                    <div class='album-image'></div>
                    <div class='album-songs'>
                        <div class='song-image'></div>
                        <div class='name'>
                            <div class='song-name'>Real Life</div>
                            <div class='singer'>Xavier Haas / A Road Through Synthwave</div>
                        </div>
                        <div class='songs'></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
