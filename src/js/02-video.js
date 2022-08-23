import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCAL_STORAGE_CURRENT_TIME = 'videoplayer-current-time';

const player = new Vimeo('vimeo-player');

player.on('loaded', () => {
  let currentTime = localStorage.getItem(LOCAL_STORAGE_CURRENT_TIME) || 0;
  player.setCurrentTime(currentTime);
});

player.on(
  'timeupdate',
  throttle(({ seconds }) => {
    localStorage.setItem(LOCAL_STORAGE_CURRENT_TIME, seconds);
  }, 1000)
);