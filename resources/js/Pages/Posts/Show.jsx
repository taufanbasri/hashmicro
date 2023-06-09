import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Show({ postData, comments, auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        content: '',
    })

    const handleSubmit = (event) => {
        event.preventDefault();

        post(`/posts/${postData.id}/comments`, {
            onSuccess: reset('content')
        })
    };

    return (
        <Authenticated
            auth={auth}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Details Post</h2>}
        >
            <Head title="Details Post" />

            <div className="container py-8 mx-auto">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-4">
                        <Link
                            href={route('posts.index')}
                            className="text-blue-500 transition-colors duration-300 hover:text-blue-600"
                        >
                            Back to All Posts
                        </Link>
                    </div>

                    <h1 className="mb-4 text-3xl font-bold">{postData.title}</h1>
                    <p className="mb-4 text-2xl text-gray-600">{postData.content}</p>
                    <p className="mb-8 text-sm text-gray-400">Posted by {postData.user.name} on {postData.created_at}</p>
                    <hr className="mb-8" />
                    <h3 className="mb-4 text-xl font-bold">Comments ({comments.length})</h3>
                    {comments.map((comment) => (
                        <div key={comment.id} className="mb-8">
                            <p className="text-xl text-gray-600">{comment.content}</p>
                            <p className="mt-2 text-sm text-gray-400">Posted by {comment.user.name} on {comment.created_at}</p>
                            <hr className="my-2" />
                        </div>
                    ))}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="commentContent" className="block mb-2 font-bold">
                                Add a comment
                            </label>
                            <textarea id='commentContent'
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

    );
}
