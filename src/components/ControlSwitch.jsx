export default function ControlSwitch({ label, value, onChange, disabled }) {
    return (
        <div className="flex flex-col items-center">
            {/* Label above */}
            <span className="text-sm mb-1">{label}</span>

            {/* Toggle */}
            <label className={`relative inline-flex items-center ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}>
                <input
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                    disabled={disabled}
                    className="sr-only peer"
                />
                {/* Background */}
                <div
                    className={`
            w-14 h-8 rounded-full transition-colors
            ${value ? "bg-blue-500" : "bg-gray-400"}
          `}
                ></div>

                {/* Circle knob */}
                <span
                    className={`
            absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform
            ${value ? "translate-x-6" : ""}
          `}
                ></span>
            </label>
        </div>
    );
}
