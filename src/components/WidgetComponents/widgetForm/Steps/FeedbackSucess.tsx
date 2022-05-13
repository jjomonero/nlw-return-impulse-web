import { Checks } from "phosphor-react";
import { CloseButton } from "../../CloseButton";

type FeedbackSucessProps = {
    onFeedbackRestartRequest: () => void;
}

export function FeedbackSucess({onFeedbackRestartRequest}: FeedbackSucessProps) {
    return (
        <>
            <header>
                <CloseButton/>
            </header>   

            <div className="flex flex-col items-center py-10 w-[304px]">
                <Checks 
                color="limegreen" 
                size="60" 
                weight="fill" 
                className="border-zinc-800 border-4 rounded-md w-20 h-20"
                />
            <span className="text-xl mt-2">Agradecemos o feeback!</span>

            <button
                type="button"
                className="py-2 px-6 mt-6 bg-zinc-800  rounded-md border-transparent text-sm leading-6 
                hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-offset-zinc-900 focus:ring-secondary-500 transition-colors"
                onClick={onFeedbackRestartRequest}
            >
                Quero enviar outro.
            </button>
            </div>
        </>
    );
}
