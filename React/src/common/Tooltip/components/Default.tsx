import {Content, Portal, Provider, Root, Trigger} from '@radix-ui/react-tooltip';
import {isNumber, isString} from "lodash";
import {FC, ReactNode} from 'react';

type DefaultProps = {
    title: ReactNode
    content: ReactNode
}
const Default:FC<DefaultProps> = ({title, content}) => {

    return (
        <Provider >
            <Root>
                <Trigger asChild>
                    {
                        isString(title) || isNumber(title)? (
                            <p className="truncate">
                                {title}
                            </p>
                        ) : title
                    }
                </Trigger>
                <Portal>
                    <Content sideOffset={4} asChild align='start' side='bottom'>
                        <div className='text-xs max-w-sm text-wrap break-all border bg-slate-700 text-white shadow rounded px-2 py-1'>
                            {content}
                        </div>
                    </Content>
                </Portal>
            </Root>
        </Provider>
    );
};

export default Default;