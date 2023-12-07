import { useUserContext } from '@/context/AuthContext'
import { multiFormatDateString } from '@/lib/utils'
import { Models } from 'appwrite'
import { FileEdit } from 'lucide-react';
import { Link } from 'react-router-dom'
import PostStats from './PostStats';
import { useState } from 'react';

interface PostCardProps {
    post: Models.Document
}

function PostCard({ post }: PostCardProps) {
    const { user } = useUserContext()
    const [like, setLike] = useState(false);
    const isLiked = () => {
        setLike(true);
        setTimeout(() => {
            setLike(false);
        }, 1000)

    }
    return (
        <div className='post-card relative'>
            <div className='flex-between'>
                <div className='flex items-center gap-3'>
                    <Link to={`/profile/${post.creator.$id}`}>
                        <img
                            src={
                                post.creator?.imageUrl ||
                                "/assets/icons/profile-placeholder.svg"
                            }
                            alt="creator"
                            className="w-12 lg:h-12 rounded-full"
                        />
                    </Link>

                    <div className="flex flex-col">
                        <p className="base-medium lg:body-bold text-light-1">
                            {post.creator.name}
                        </p>
                        <div className="flex-center gap-2 text-light-3">
                            <p className="subtle-semibold lg:small-regular ">
                                {multiFormatDateString(post.$createdAt)}
                            </p>
                            •
                            <p className="subtle-semibold lg:small-regular">
                                {post.location}
                            </p>
                        </div>
                    </div>
                </div>
                <Link
                    to={`/update-post/${post.$id}`}
                    className={`${user.id !== post.creator.$id && "hidden"}`}>
                    <FileEdit />
                </Link>
            </div>

            <Link to={`/posts/${post.$id}`}>
                <div className="small-medium lg:base-medium py-5">
                    <p>{post.caption}</p>
                    <ul className="flex gap-1 mt-2">
                        {post.tags.map((tag: string, index: string) => (
                            <li key={`${tag}${index}`} className="text-light-3 small-regular">
                                #{tag}
                            </li>
                        ))}
                    </ul>
                </div>
                <img
                    src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
                    alt="post image"
                    className="post-card_img"
                />
            </Link>
            {like && <img
                src="/assets/icons/liked.svg"
                alt="like"
                width={150}
                height={150}

                className="absolute top-[50%] left-[40%] duration-400"
            />}
            <PostStats post={post} userId={user.id} isLiked={isLiked} />
        </div>
    )
}

export default PostCard