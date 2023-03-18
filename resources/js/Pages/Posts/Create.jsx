import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'

const Create = ({ auth }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
    })

    const handleSubmit = (event) => {
        event.preventDefault();

        post(`/posts`, {
            onSuccess: reset(['title', 'content'])
        })
    };

    return (
        <Authenticated
            auth={auth}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Create Post</h2>}
        >
            <Head title="Create Post" />

            <div className="container py-8 mx-auto">
                <div className="max-w-2xl mx-auto mt-4">
                    <div className="mb-4">
                        <Link
                            href={route('posts.index')}
                            className="text-blue-500 transition-colors duration-300 hover:text-blue-600"
                        >
                            Back to All Posts
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block mb-2 font-bold">
                                Title
                            </label>
                            <input type='text' id='title' placeholder='Post Title'
                                className="w-full p-2 rounded-lg"
                                value={data.title}
                                onChange={(event) => setData('title', event.target.value)}
                            />
                            {errors.title && <div className='mt-2 text-red-400'>{errors.title}</div>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="commentContent" className="block mb-2 font-bold">
                                Content
                            </label>
                            <textarea placeholder='Post Title' id='commentContent'
                                className="w-full p-2 rounded-lg"
                                value={data.content}
                                onChange={(event) => setData('content', event.target.value)}
                            />
                            {errors.content && <div className='text-red-400'>{errors.content}</div>}
                        </div>
                        <div className='flex justify-end'>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Authenticated>
    )
}

export default Create
