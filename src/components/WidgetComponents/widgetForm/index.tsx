import { useState } from "react";
import { CloseButton } from "../CloseButton";
import bugImageUrl from '../../../assets/bug.svg'
import ideaImageUrl from '../../../assets/idea.svg'
import thoughtImageUrl from '../../../assets/thought.svg'
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackTypeContents } from "./Steps/FeedbackTypeContents";
import { FeedbackSucess } from "./Steps/FeedbackSucess";

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de uma lâmpada'
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: thoughtImageUrl,
            alt: 'Imagem de uma nuvem/balão de pensamento'
        }
    }
}

export type FeedbackType =  keyof typeof feedbackTypes;

// Muita atenção a essa funcionalidade do TypeScript - EXTREMAMENTE IMPORTANTE

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>();
    
    const [feedbackSent, setFeedbackSent] = useState(false)
    //Utilização de função entre componentes - Maxima Atenção

    function handleRestartFeedback() {
        setFeedbackSent(false)
        setFeedbackType(null)
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

           { feedbackSent ? (
               <FeedbackSucess onFeedbackRestartRequest={handleRestartFeedback}/>
           ):
           (
               <>
                {!feedbackType ? (
               <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/> 
           ) : 
                <FeedbackTypeContents 
                feedbackType={feedbackType}
                onFeedbackRestartRequest={handleRestartFeedback}
                onFeedbackSent={() => setFeedbackSent(true)}
                />
           }
               </>
           )
        }
            {/* Estrutura de condição junto a execução de funções */}
            
            <footer className="text-xs text-neutral-400">
                Feito com s2 pelo <a className=" underline underline-offset-2" href="https://google.com">oMonero</a> 
            </footer>

        </div>
    );
}