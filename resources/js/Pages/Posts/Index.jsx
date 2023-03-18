import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';

export default function Index({ posts, auth }) {
    return (

        <Authenticated
            auth={auth}
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">All Posts</h2>}
        >
            <Head title="All Posts" />

            <div className="max-w-3xl mx-auto mt-4">
                <div className="flex justify-end">
                    <Link
                        href={route('posts.create')}
                        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
                    >
                        New Post
                    </Link>
                </div>

                {posts.data.map((post) => (
                    <div key={post.id} className="p-4 mb-4 bg-white rounded-lg">
                        <Link
                            href={route('posts.show', { post: post.id })}
                            className="text-lg font-semibold transition-colors duration-300 hover:text-blue-500"
                        >
                            {post.title}
                        </Link>
                        <p className="mb-2 text-gray-500">{post.created_at}</p>
                        <p className="text-gray-600">{post.body}</p>
                        <p className="mt-2 text-right">
                            <Link
                                href={route('posts.show', { post: post.id })}
                                className="text-blue-500 transition-colors duration-300 hover:text-blue-600"
                            >
                                Read More
                            </Link>
                        </p>
                    </div>
                ))}

                <div className="mt-4">
                    {posts.links.map((link) => (
                        <Link
                            key={link.label}
                            href={link.url}
                            className={`bg-white border border-gray-300 px-3 py-1 mx-1 ${link.active ? 'text-blue-500 font-bold' : ''
                                } hover:text-blue-500 transition-colors duration-300`}
                        >
                            {link.label === '&laquo; Previous' ? (
                                <span>&#8592; Previous</span>
                            ) : link.label === 'Next &raquo;' ? (
                                <span>Next &#8594;</span>
                            ) : (
                                link.label
                            )}
                        </Link>
                    ))}
                </div>

            </div>
        </Authenticated>


    );
}
