import { Alert } from "./component/Alert";
import { Header } from "./component/Header";
import { useHashNavigation } from "./hooks/useHashNavigation";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Single } from "./pages/Single";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const { page, param } = useHashNavigation();
  const pageContent = getPageContent(page, param);

  return (
    <>
      <Header page={page} />
      <p>Page: {page}</p>
      <div className="container my-3">
        <ErrorBoundary FallbackComponent={PageError}>
          {pageContent}
        </ErrorBoundary>
      </div>
    </>
  );
}

function PageError({ error }) {
  return <Alert type="danger">{error.toString()}</Alert>;
}

function getPageContent(page, param) {
  if (page === "home") {
    return <Home />;
  }

  if (page === "contact") {
    return <Contact />;
  }

  if (page === "post") {
    return <Single postId={param} />;
  }

  return <NotFound page={page} />;
}

export default App;
