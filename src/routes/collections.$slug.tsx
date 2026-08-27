import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { getCollection, productsInCollection } from "@/lib/catalog";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = getCollection(params.slug);
    if (!collection) throw notFound();
    return { collection };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Collection Not Found — Loomsville" }, { name: "robots", content: "noindex" }],
      };
    }
    const { collection } = loaderData;
    const title = `${collection.name} Collection (${collection.threadCount}) — Loomsville`;
    return {
      meta: [
        { title },
        { name: "description", content: collection.desc },
        { property: "og:title", content: title },
        { property: "og:description", content: collection.desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: CollectionNotFound,
  component: CollectionDetailPage,
});

function CollectionNotFound() {
  return (
    <div className="lv page">
      <section className="page-head">
        <div className="wrap">
          <h1 className="page-title">Collection not found.</h1>
          <p className="p-lead">We couldn't locate that weave collection.</p>
          <Link className="btn btn-primary" to="/collections">
            View all collections
          </Link>
        </div>
      </section>
    </div>
  );
}

function CollectionDetailPage() {
  const { collection } = Route.useLoaderData();
  const collectionProducts = productsInCollection(collection.slug);

  return (
    <div className="lv page">
      <section className="page-head">
        <div className="wrap">
          <p className="crumbs">
            <Link to="/collections">Collections</Link>
            <span>/</span>
            <span className="current">{collection.name}</span>
          </p>
          <span className="tc-tag">{collection.threadCount}</span>
          <h1 className="page-title">{collection.name}</h1>
          <p className="p-lead">{collection.desc}</p>
        </div>
      </section>

      <section className="page-body">
        <div className="wrap">
          <div className="collection-header-meta">
            <p className="result-count">
              Showing {collectionProducts.length} {collectionProducts.length === 1 ? "weave" : "weaves"}
            </p>
          </div>

          <div className="collection-grid">
            {collectionProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
