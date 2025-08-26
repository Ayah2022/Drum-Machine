import { useEffect, useCallback, useRef } from "react";

export default function DrumPad({ id, letter, src, playSound, power, classVal }) {

    const btnRef = useRef(null);

    const handlePlay = useCallback(() => {
        if (!power) return;
        const audio = document.getElementById(letter);
        audio.currentTime = 0;
        audio.play();
        playSound(letter, id);

        const btn = btnRef.current;
        if (btn) {
            btn.classList.add("scale-95", "bg-blue-600");
            setTimeout(() => btn.classList.remove("scale-95", "bg-blue-600"), 150);
        }
    }, [id, letter, playSound, power]);

    useEffect(() => {
        const handleKeydown = (e) => {
            if (e.key.toUpperCase() === letter) {
                handlePlay();
            }
        };
        document.addEventListener("keydown", handleKeydown);
        return () => document.removeEventListener("keydown", handleKeydown);
    }, [handlePlay, letter]);

    return (
        <button ref={btnRef} className="drum-pad bg-gray-600 rounded-lg py-8 text-2xl font-bold shadow-md hover:bg-gray-500 transition transform" id={id} onClick={handlePlay}>
            {letter}

            <audio className="clip" id={letter} src={src}></audio>
        </button>
    );
}
