import html2canvas from 'html2canvas';
import { Camera, Trash } from 'phosphor-react';
import { useState } from 'react';
import { LoadingWidget } from '../LoadingWidget';

type ScreenshotButtonProps = {
    screenshot: string | null;
    onScreenshotTook: (screenshot: string | null) => void;
    //MUITA ATENÇÃO outro exemplo de comunicação entre componentes
}

export function ScreenshotButton({screenshot, onScreenshotTook}: ScreenshotButtonProps) {
    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

    async function handleTakeScreenshot() {
        setIsTakingScreenshot(true)
        const canvas = await html2canvas(document.querySelector('html')!);
        //MUITA ATENÇÃO o "!" no final da função é para dizer a função que sempre retornara o valor e nunca retornara null assim sumindo o aviso de erro
        const base64image = canvas.toDataURL('image/png');

        onScreenshotTook(base64image);

        setIsTakingScreenshot(false)
    }
    //MUITA ATENÇÃO função responsável por tirar print da tela e a resultante do print vir em formato texto base64image
    //Biblioteca utilizada para essa transformação de dados "html2canvas"


    if (screenshot) {
        return (
            <button
                type="button"
                className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
                onClick={() => onScreenshotTook(null)}
                style={{
                    backgroundImage: `url(${screenshot})`,
                    backgroundPosition: 'bottom right',
                    backgroundSize: 188,
                }}
                //Solução utilizando a forma de estilização do React com style={{}} as duas chaves identificando
                // que a primeira chave é pra identifcar que estamos incluindo um código JS dentro do html e uma segunda chave
                // para indicar que é um objeto javascript

                //Utilizando a backgroundImage para vizualizar como imagem no botão a "string" trazida pela screenshot em base64image 
            >
                <Trash weight="fill"/>
            </button>
        )
    }

    return (
        <button
            type="button"
            onClick={handleTakeScreenshot}
            className="p-2 bg-zinc-700 rounded-md border-transparent hover:bg-zinc-600 transition-colors
            hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-offset-zinc-900 focus:ring-secondary-500 transition-colors "
        >   
            {isTakingScreenshot ? <LoadingWidget/> : <Camera className="w-6 h-6"/>}
        </button>
    );
}