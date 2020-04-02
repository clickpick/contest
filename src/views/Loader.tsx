import React, { FC } from 'react';

import { View, Panel, Spinner } from '@vkontakte/vkui';

export interface LoaderProps {
    id: string
}

const Loader: FC<LoaderProps> = ({ id }: LoaderProps) => {

    return (
        <View id={id} activePanel="loader" header={false}>
            <Panel id="loader">
                <Spinner size="medium" style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translate(0, -50%)'
                }} />
            </Panel>
        </View>
    );
};

export default Loader;