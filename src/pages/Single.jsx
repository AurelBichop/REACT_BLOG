import { Alert } from "../component/Alert";
import { Button } from "../component/Button";
import { Spinner } from "../component/Spinner";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useFetch } from "../hooks/useFetch";

export function Single({ postId }) {
  const {
    data: post,
    loading,
    error,
  } = useFetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  useDocumentTitle(post?.title);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert type="danger">{error.toString()}</Alert>;
  }

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
          <Button variant="secondary">Editer l'article</Button>
        </div>
      )}
    </>
  );
}
