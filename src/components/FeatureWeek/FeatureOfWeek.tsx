import { JSX } from 'jsx/jsx';

import './style.scss';

export const FeatureOfWeek = () => {
    const SONGNAME: string = 'Love The Way You Lie';
    const SINGERS: string = 'Eminem ft. Rihanna';

    return (
        <div class='feature-week'>
            <div class='position-feature'>
                <div class='title'>
                    <div class='title-text'>FEATURED OF THE WEEK</div>
                </div>
            </div>
            <a href='/' class='song-name'>
                {SONGNAME}
            </a>
            <a href='/' class='singers'>
                {SINGERS}
            </a>
            <div class='position-button'>
                <button class='play'></button>
            </div>
        </div>
    );
};
