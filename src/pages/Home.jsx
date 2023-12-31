import { Alert } from "../component/Alert";
import { Card } from "../component/Card";
import { Spinner } from "../component/Spinner";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useFetch } from "../hooks/useFetch";

export function Home() {
  useDocumentTitle("Mon Blog");
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10"
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert type="danger">{error.toString()}</Alert>;
  }

  return (
    <>
      <h1 className="mb-3">Mon Blog</h1>
      {/* Render the fetched data */}
      {data && (
        <div className="row gap-4">
          {data.map((post) => (
            <div key={post.id} className="col-12 col-md-4">
              <Card
                image={`https://picsum.photos/id/${post.id}/280/180`}
                title={post.title}
                description={post.body}
                href={`#post:${post.id}`}
                buttonLabel="Voir l'article"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
