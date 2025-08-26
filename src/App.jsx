import DrumPad from "./components/DrumPad";
import ControlSwitch from "./components/ControlSwitch";
import VolumeControl from "./components/VolumeControl";
import Display from "./components/Display";
import { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [power, setPower] = useState(true);
  const [bank, setBank] = useState(false);// false = drum, true = piano
  const [display, setDisplay] = useState("");
  const [volume, setVolume] = useState(0.5);
  const [lastKeys, setLastKeys] = useState({ drum: null, piano: null });

  const playSound = (letter, name) => {
    // Update display
    setDisplay(name);

    // Save last key for the current bank
    if (bank) {
      setLastKeys(prev => ({ ...prev, piano: letter }));
    } else {
      setLastKeys(prev => ({ ...prev, drum: letter }));
    }
  };

  // update volume globally
  useEffect(() => {
    const audios = document.querySelectorAll("audio");
    audios.forEach((audio) => (audio.volume = volume));
  }, [volume]);

  const handleBank = () => {
    if (!power) return;
    const newBank = !bank;
    setBank(newBank);

    // Pick the right set of pads for the new bank
    const activePads = newBank ? bankTwo : bankOne;

    // Get the last key for that bank
    const lastKey = newBank ? lastKeys.piano : lastKeys.drum;

    if (lastKey) {
      const sound = activePads.find((pad) => pad.letter === lastKey);
      if (sound) setDisplay(sound.id);
    } else {
      setDisplay(""); // clear if no key was played in this bank yet
    }
  };
  const bankOne = [
    { id: "Heater-1", letter: "Q", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
    { id: "Heater-2", letter: "W", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
    { id: "Heater-3", letter: "E", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
    { id: "Heater-4", letter: "A", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
    { id: "Clap", letter: "S", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
    { id: "Open-HH", letter: "D", src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
    { id: "Kick-n'-Hat", letter: "Z", src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
    { id: "Kick", letter: "X", src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
    { id: "Closed-HH", letter: "C", src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" },
  ];

  const bankTwo = [
    { id: "Chord-1", letter: "Q", src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" },
    { id: "Chord-2", letter: "W", src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3" },
    { id: "Chord-3", letter: "E", src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3" },
    { id: "Shaker", letter: "A", src: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3" },
    { id: "Open-HH", letter: "S", src: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3" },
    { id: "Closed-HH", letter: "D", src: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3" },
    { id: "Punchy-Kick", letter: "Z", src: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3" },
    { id: "Side-Stick", letter: "X", src: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3" },
    { id: "Snare", letter: "C", src: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3" },
  ];

  const pads = bank ? bankTwo : bankOne;


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">

      <div id="drum-machine" className="flex gap-8 p-8 bg-gray-800 rounded-xl shadow-2xl">
        {/* Left: Drum Pads */}
        <div className="grid grid-cols-3 gap-4 w-64">
          {pads.map((pad) => (
            <DrumPad key={pad.letter} {...pad} playSound={() => playSound(pad.letter, pad.id)} power={power}
              classVal="drum-pad rounded-xl bg-slate-700 p-6 text-xl transition-colors duration-150
                 data-[active=true]:bg-violet-600"/>
          ))}
        </div>

        {/* Right: Controls */}
        <div className="flex flex-col justify-between w-56">
          <ControlSwitch label="Power" value={power} onChange={() => setPower(!power)} />
          <Display text={display} />
          <VolumeControl volume={volume} setVolume={setVolume} />
          <ControlSwitch label="Bank" value={bank} onChange={handleBank} disabled={!power} />
        </div>
      </div>
    </div>
  );
}