export default function Display({ text }) {
    return (
        <div id="display" className="bg-gray-700 text-center p-4 rounded-lg font-semibold text-lg">
            {text}
        </div>
    );
}