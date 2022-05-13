import { useState } from 'react';
import { Popover } from '@headlessui/react'
import { ChatTeardropDots } from 'phosphor-react'
import { WidgetForm } from './widgetForm';

export function WidgetButton() {
    const [isWidgetOpen, setIsWidgetOpen] = useState(false)

    function toggleWidgetVisibility() {
        setIsWidgetOpen(!isWidgetOpen)
    }

    return (
        <Popover 
        className="
        absolute 
        bottom-5 
        right-5 
        flex
        flex-col
        items-end
        ">
            <Popover.Panel><WidgetForm/></Popover.Panel>
            <Popover.Button
            onClick={toggleWidgetVisibility}
            className="
            bg-primary-500 
            px-3 
            h-12 
            rounded-full 
            text-white 
            flex 
            items-center
            group
            "
            >
                <ChatTeardropDots className="w-6 h-6" weight='bold'/>
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
                    <span className="pl-2 "></span>
                    Feedback
                </span>
            </Popover.Button>
        </Popover>
    );
}
