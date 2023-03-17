import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Show({ post, comments, auth }) {
    const [commentContent, setCommentContent] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        Inertia.post(`/posts/${post.id}/comments`, {
            content: commentContent,
        }).then(() => {
            setCommentContent('');
        });
    };

    return (
        <Authenticated
            auth={auth}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Details Post</h2>}
        >
            <Head title="Details Post" />


            <div className="container py-8 mx-auto">
                <div className="max-w-2xl mx-auto">
                    <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
                    <p className="mb-4 text-gray-600">{post.content}</p>
                    <p className="mb-8 text-gray-400">Posted by {post.user.name} on {post.created_at}</p>
                    <hr className="mb-8" />
                    <h3 className="mb-4 text-xl font-bold">Comments ({comments.length})</h3>
                    {comments.map((comment) => (
                        <div key={comment.id} className="mb-8">
                            <p className="text-gray-600">{comment.content}</p>
                            <p className="mt-2 text-gray-400">Posted by {comment.user.name} on {comment.created_at}</p>
                            <hr className="my-2" />
                        </div>
                    ))}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="commentContent" className="block mb-2 font-bold">
                                Add a comment
                            </label>
                            <textarea
                                id="commentContent"
                                className="w-full p-2 rounded-lg"
                                value={commentContent}
                                onChange={(event) => setCommentContent(event.target.value)}
                            />
                        </div>
                        <div>
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
