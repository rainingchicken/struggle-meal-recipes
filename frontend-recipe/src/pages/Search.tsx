import { FormEvent, useEffect, useState } from "react";
import { useGetAllRecipesMutation } from "../slices/recipeApiSlice";
import IRecipeDetails from "../interfaces/IRecipeDetails";

// import ShortDetailedRecipe from "../components/displays/ShortDetailedRecipe";
import { useLocation, useNavigate } from "react-router-dom";
import PublicShortDetailedRecipe from "../components/displays/PublicShortDetailedRecipe";

const Search = () => {
  //   const urlParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const location = useLocation();

  const [recipes, setRecipes] = useState<Array<IRecipeDetails>>([]);
  const [filters, setFilters] = useState<any>({
    searchTerm: "",
    vegan: "",
    categories: "",
    health: 0,
    desperation: 0,
    sort: "desc",
  });
  const [showMore, setShowMore] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [getAllRecipesAPICall, { isLoading }] = useGetAllRecipesMutation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get("searchTerm");
    const sortFromURL = urlParams.get("sort");
    const veganFromURL = urlParams.get("vegan");
    const categoriesFromURL = urlParams.get("categories");
    const healthFromURL = urlParams.get("health");
    const desperationFromURL = urlParams.get("desperation");

    if (
      searchTermFromURL ||
      sortFromURL ||
      veganFromURL ||
      categoriesFromURL ||
      healthFromURL ||
      desperationFromURL
    ) {
      setFilters({
        ...filters,
        vegan: veganFromURL,
        categories: categoriesFromURL,
        // categories: "",
        health: healthFromURL,
        desperation: desperationFromURL,
        sort: sortFromURL,
      });
    }
    const fetchRecipes = async () => {
      const searchQuery = urlParams.toString();
      try {
        const res = await getAllRecipesAPICall(searchQuery).unwrap();
        if (res.length < 5) {
          setShowMore(false);
        }
        setRecipes(res);
      } catch (err) {
        console.log(err);
        setError("Something went wrong. Cannot load recipes");
      }
    };
    fetchRecipes();
    document.title = "Search";
  }, [location.search]);

  const handleShowMore = async () => {
    const startIndex = recipes.length;
    try {
      const res = await getAllRecipesAPICall(
        `startIndex=${startIndex}`
      ).unwrap();

      setRecipes((state) => [...state, ...res]);

      if (res.length < 5) {
        setShowMore(false);
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Cannot load recipes");
    }
  };

  const handleSearchChange = (e: FormEvent) => {
    const { id, type } = e.target as HTMLInputElement;
    // console.log(type, id, value);
    if ((type === "text" && id === "searchTerm") || id === "categories") {
      setFilters({
        ...filters,
        [id]: (e.target as HTMLInputElement).value,
      });
    }
    if ((type === "range" && id === "health") || id === "desperation") {
      setFilters({
        ...filters,
        [id]: +(e.target as HTMLInputElement).value,
      });
    }
    if (id === "vegan") {
      const isVegan = (e.target as HTMLInputElement).value || "";
      setFilters({
        ...filters,
        [id]: isVegan,
      });
    }
    if (id === "sort") {
      const order = (e.target as HTMLInputElement).value || "desc";
      setFilters({
        ...filters,
        [id]: order,
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", filters.searchTerm);
    urlParams.set("sort", filters.sort);
    urlParams.set("vegan", filters.vegan);
    urlParams.set("categories", filters.categories);
    urlParams.set("health", filters.health);
    urlParams.set("desperation", filters.desperation);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    // console.log(filters.sort);
  };

  const loaded = () => {
    return (
      <>
        {/* {console.log(filters)}
        {console.log(recipes)} */}
        <form className="RecipeForm" onSubmit={handleSubmit}>
          <label htmlFor="searchTerm">Search</label>
          <input
            type="text"
            name="searchTerm"
            id="searchTerm"
            value={filters.searchTerm}
            onChange={handleSearchChange}
          />

          <label htmlFor="categories">Category</label>
          <select
            className="RecipeFormSelection"
            name="categories"
            id="categories"
            value={filters.categories}
            onChange={handleSearchChange}
          >
            <option value=""></option>
            <option value="Mix">Mix</option>
            <option value="Asia">Asia</option>
            <option value="Africa">Africa</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Europe">Europe</option>
            <option value="Australia">Australia</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="vegan">Vegan only?</label>
          <select
            className="RecipeFormSelection"
            name="vegan"
            id="vegan"
            value={filters.vegan}
            onChange={handleSearchChange}
          >
            <option value="">No</option>{" "}
            <option value="true">Vegan only</option>
            <option value="notvegan">Nonvegan only</option>
          </select>

          <label htmlFor="sort">Sort</label>
          <select
            className="RecipeFormSelection"
            name="sort"
            id="sort"
            value={filters.sort}
            onChange={handleSearchChange}
          >
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </select>

          <label htmlFor="desperation">
            Desperation: {filters.desperation}{" "}
          </label>
          <input
            type="range"
            className="slider"
            min="0"
            max="10"
            step="1"
            id="desperation"
            name="desperation"
            value={filters.desperation}
            onChange={handleSearchChange}
          />

          <label htmlFor="health">Health: {filters.health}</label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            id="health"
            name="health"
            className="slider"
            value={filters.health}
            onChange={handleSearchChange}
          />

          <button className="btnForm">FILTER</button>
        </form>
        <div className="recipeParentParentContainer">
          <div className="recipeParentContainer">
            {recipes &&
              recipes.map((recipe: IRecipeDetails) => (
                <div className="recipeContainer" key={`div${recipe._id}`}>
                  <PublicShortDetailedRecipe key={recipe._id} recipe={recipe} />{" "}
                </div>
              ))}{" "}
          </div>
        </div>
        {showMore && (
          <button className="btnForm" onClick={handleShowMore}>
            SHOW MORE
          </button>
        )}
        <p className="error">{error}</p>
      </>
    );
  };
  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <div>
      <h1 className="title">Search Results</h1>
      <>{isLoading ? loading() : loaded()}</>
    </div>
  );
};

export default Search;
