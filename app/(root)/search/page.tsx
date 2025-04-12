import ProductCard from "@/components/shared/product/product-card";
import { getAllProducts, getAllCategories } from "@/lib/actions/product.actions";
import Link from "next/link";

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $100",
    value: "51-100",
  },
  {
    name: "$101 to $200",
    value: "101-200",
  },
  {
    name: "$201 to $500",
    value: "201-500",
  },
  {
    name: "$501 to $1000",
    value: "501-1000",
  },
];

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  // Construct filter url
  const getFilterUrl = ({
    categoryFilter,
    priceFilter,
    ratingFilter,
    sortFilter,
    pageFilter,
  }: {
    categoryFilter?: string;
    priceFilter?: string;
    ratingFilter?: string;
    sortFilter?: string;
    pageFilter?: string;
  }) => {
    const params = { q, category, price, rating, sort, page };

    if (categoryFilter) params.category = categoryFilter;
    if (priceFilter) params.price = priceFilter;
    if (ratingFilter) params.category = ratingFilter;
    if (sortFilter) params.category = sortFilter;
    if (pageFilter) params.category = pageFilter;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  const categories = await getAllCategories();

  return (
    <div className='grid md:grid-cols-5 md:gap-5'>
      <div className='filter-links'>
        {/* Category Filter Links */}
        <div className='text-xl mb-2 mt-3'>Category</div>
        <div>
          <ul className='space-y-1'>
            <li>
              <Link
                className={`${(category === "all" || category === "") && "font-bold"}`}
                href={getFilterUrl({ categoryFilter: "all" })}
              >
                Any
              </Link>
            </li>
            {categories.map((x) => (
              <li key={x.category}>
                <Link
                  className={`${category === x.category && "font-bold"}`}
                  href={getFilterUrl({ categoryFilter: x.category })}
                >
                  {x.category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Filter Links */}
        <div className='text-xl mb-2 mt-8'>Price</div>
        <div>
          <ul className='space-y-1'>
            <li>
              <Link className={`${price === "all" && "font-bold"}`} href={getFilterUrl({ priceFilter: "all" })}>
                Any
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link className={`${price === p.value && "font-bold"}`} href={getFilterUrl({ priceFilter: p.value })}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='md:col-span-4 space-y-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          {products.data.length === 0 && <div>No products found</div>}
          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
