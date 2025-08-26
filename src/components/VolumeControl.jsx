export default function VolumeControl({ volume, setVolume }) {
    return (
        <div className="flex flex-col items-center mt-4">
            <span className="text-sm mb-1">Volume</span>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-blue-500"
            />
        </div>
    );
}