import bridge from '@vkontakte/vk-bridge';
import { Links } from '../config';

export const init = () => bridge.send('VKWebAppInit');

export const subscribe = () => {
    bridge.subscribe((e) => {
        if (e.detail.type === 'VKWebAppUpdateConfig') {
            const schemeAttribute = document.createAttribute('scheme');
            schemeAttribute.value = e.detail.data.scheme ? e.detail.data.scheme : 'client_dark';
            document.body.attributes.setNamedItem(schemeAttribute);

            let statusBarStyle: 'light' | 'dark' = 'dark';
            let actionBar = '#000';
            let navigationBar = '#FFF';

            if (schemeAttribute.value === 'space_gray' || schemeAttribute.value === 'client_dark') {
                statusBarStyle = 'light';
                actionBar = '#FFF';
                navigationBar = '#171717';
            }

            setViewSettings(statusBarStyle, actionBar, navigationBar);
        }
    })
}

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