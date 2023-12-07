import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { useLocation } from "react-router-dom";
import {useState,useEffect} from 'react';
import { useDeleteSavedPost, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

type PostStatsProps = {
    post: Models.Document;
    userId: string;
    isLiked:()=>void;
  };

function PostStats({post,userId,isLiked}:PostStatsProps) {
    const location = useLocation();
    const likesList = post.likes.map((user: Models.Document) => user.$id);
  
    const [likes, setLikes] = useState<string[]>(likesList);
    const [isSaved, setIsSaved] = useState(false);
  
    const { mutate: likePost } = useLikePost();
    const { mutate: savePost } = useSavePost();
    const { mutate: deleteSavePost } = useDeleteSavedPost();
  
    const { data: currentUser } = useUserContext();
  
    const savedPostRecord = currentUser?.save.find(
      (record: Models.Document) => record.post.$id === post.$id
    );
  
    useEffect(() => {
      setIsSaved(!!savedPostRecord);
    }, [currentUser]);
  
    const handleLikePost = (
      e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
      e.stopPropagation();
  
      let likesArray = [...likes];
  
      if (likesArray.includes(userId)) {
        likesArray = likesArray.filter((Id) => Id !== userId);
      } else {
        isLiked()
        likesArray.push(userId);
      }
  
      setLikes(likesArray);
      likePost({ postId: post.$id, likesArray });
    };

    const handleSavePost = (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
      ) => {
        e.stopPropagation();
    
        if (savedPostRecord) {
          setIsSaved(false);
          return deleteSavePost(savedPostRecord.$id);
        }
    
        savePost({ userId: userId, postId: post.$id });
        setIsSaved(true);
      };
  return (
    <div className="flex justify-between items-center z-20">
        <div className="flex gap-2 mr-5">
        <img
          src={`${
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={(e) => handleLikePost(e)}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
        </div>

    </div>
  )
}

export default PostStats