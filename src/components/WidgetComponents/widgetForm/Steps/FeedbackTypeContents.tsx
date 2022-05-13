import { ArrowBendDoubleUpLeft, Camera} from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { FeedbackType, feedbackTypes } from '..';
import { api } from '../../../../services/api';
import { CloseButton } from '../../CloseButton';
import { LoadingWidget } from '../../LoadingWidget';
import { ScreenshotButton } from '../ScreenshotButton';

type FeedbackTypeContentsProps = {
    feedbackType: FeedbackType;
    onFeedbackRestartRequest: () => void;
    onFeedbackSent: () => void;
    //Ao trazer a exportação dessa função e obrigatóriamente ter que tipar, você pode passar como tipo o parametro ARROW FUNCTION indicando que se trata de uma função
}

export function FeedbackTypeContents({
    feedbackType, 
    onFeedbackRestartRequest,
    onFeedbackSent,
}: FeedbackTypeContentsProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    // MUITA ATENÇÃO utilizando a função entre componentes e tipando entre "<>"

    const [comment, setComment] = useState('');
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    async function handleSubmitFeedback (event: FormEvent) {
        event.preventDefault()
        // console.log({
        //     screenshot,
        //     comment
        // })

        setIsSendingFeedback(true)

        await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot,
        })


        setIsSendingFeedback(false)
        onFeedbackSent()
    }

    return (
        <>
            <header>
                <button onClick={onFeedbackRestartRequest} className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
                    <ArrowBendDoubleUpLeft weight="bold" className="w-4 h-4"/>
                </button>

                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6"/>
                    {feedbackTypeInfo.title}
                </span>

                <CloseButton/>  
            </header>

            <form onSubmit={handleSubmitFeedback} action="" className="my-4 w-full">
                <textarea
                    className="min-w-[304px] w-full min-h-[112px] text-sm bg-transparent placeholder-zinc-400 text-zinc-100 
                    border-zinc-600 rounded-md focus:border-secondary-500 focus:ring-secondary-500 focus:ring-1 resize-none 
                    focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Conte com detalhes o que está acontecendo..."
                    onChange={event => setComment(event.target.value)}
                />

                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton 
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}
                    />

                    <button
                        type="submit"
                        className="p-2 bg-lime-600 rounded-md border-transparent flex-1 flex justify-center items-center
                        text-sm hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 
                        focus:ring-offset-zinc-900 focus:ring-secondary-500 transition-colors disabled:opacity-50
                        disabled:hover:bg-lime-600 "
                        disabled={comment.length === 0 || isSendingFeedback}
                    >
                        {isSendingFeedback ? <LoadingWidget/> : `Enviar feedback`}
                    </button>
                </footer>
            </form>

            
        </>
    );
}
