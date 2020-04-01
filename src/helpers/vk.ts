import bridge from '@vkontakte/vk-bridge';
import { Links } from '../config';

export const init = () => bridge.send('VKWebAppInit');

export const setViewSettings = (statusBarStyle: 'light' | 'dark', actionBar = '#FFF', navigationBar = '#FFF') =>
    bridge.send(
        'VKWebAppSetViewSettings',
        {
            status_bar_style: statusBarStyle,
            action_bar_color: actionBar,
            navigation_bar_color: navigationBar
        }
    );

export const enableSwipeBack = () => bridge.send('VKWebAppEnableSwipeBack');
export const disableSwipeBack = () => bridge.send('VKWebAppDisableSwipeBack');

export const closeApp = () => bridge.send('VKWebAppClose', { status: 'success' });

export const showStoryBox = (bg: string) =>
    bridge.send('VKWebAppShowStoryBox', {
        background_type: 'image',
        url: bg,
        locked: true,
        attachment: {
            text: 'Поставить цель',
            type: 'url',
            url: Links.APP,
        },
    });