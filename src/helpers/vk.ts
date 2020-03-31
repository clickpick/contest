import bridge from '@vkontakte/vk-bridge';

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