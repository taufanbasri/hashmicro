import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react'

const CheckCharacters = ({ auth }) => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post('/calculate', {
                input1,
                input2,
            })
            .then((response) => {
                setResult(response.data.percentage.toFixed(2));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <Authenticated
            auth={auth}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Check Characters</h2>}
        >
            <Head title="Details Post" />

            <div className="flex flex-col items-center justify-center">
                <h1 className="mb-4 text-2xl font-bold">Hitung Persentase Kemunculan Karakter</h1>
                <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center">
                        <label className="mb-2 font-semibold" htmlFor="input1">
                            Input 1
                        </label>
                        <input
                            className="w-full px-4 py-2 mb-4 text-gray-700 border rounded-lg focus:border-blue-500 focus:outline-none"
                            type="text"
                            id="input1"
                            name="input1"
                            value={input1}
                            onChange={(e) => setInput1(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <label className="mb-2 font-semibold" htmlFor="input2">
                            Input 2
                        </label>
                        <input
                            className="w-full px-4 py-2 mb-4 text-gray-700 border rounded-lg focus:border-blue-500 focus:outline-none"
                            type="text"
                            id="input2"
                            name="input2"
                            value={input2}
                            onChange={(e) => setInput2(e.target.value)}
                        />
                    </div>
                    <button
                        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                        type="submit"
                    >
                        Hitung
                    </button>
                </form>
                {result !== null && (
                    <div className="mt-4 text-center">
                        <p className="mb-2 text-2xl font-bold">Hasil: {result}%</p>
                    </div>
                )}
            </div>
        </Authenticated>
    )
}

export default CheckCharacters
