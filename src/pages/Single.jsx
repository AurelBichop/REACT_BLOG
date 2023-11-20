import { Alert } from "../component/Alert";
import { Button } from "../component/Button";
import { Modal } from "../component/Modal";
import { Spinner } from "../component/Spinner";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useFetch } from "../hooks/useFetch";
import { useToggle } from "../hooks/useToggle";
import { EditPostModal } from "./Single/EditPostModal";

export default function Single({ postId }) {
  const {
    data: post,
    loading,
    error,
    setData,
  } = useFetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  useDocumentTitle(post?.title);
  const [isEditing, toggleEditing] = useToggle(false);
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert type="danger">{error.toString()}</Alert>;
  }

  const handleSave = (data) => {
    setData({
      ...post,
      ...data,
    });
    toggleEditing();
  };

  return (
    <>
      {post && (
        <div>
          <h1 className="mb-3">{post.title}</h1>
          <img
            className="img-fluid img-thumbnail my-3"
            src={`https://picsum.photos/id/${post.id}/800/600`}
            alt=""
          />
          <p>{post.body}</p>
          <p>
            <a href={`#post:${post.id + 1}`}>Article Suivant</a>
          </p>
          {isEditing && (
            <EditPostModal
              post={post}
              onClose={toggleEditing}
              onSave={handleSave}
            />
          )}
          <Button variant="secondary" onClick={toggleEditing}>
            Editer l'article
          </Button>
        </div>
      )}
    </>
  );
}
