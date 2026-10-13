import { Button } from "react-bootstrap";

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div
      className="category-filter mb-4"
      style={{
        display: "flex",
        gap: "0.5rem",
        overflowX: "auto",
        paddingBottom: "0.5rem",
        scrollbarWidth: "thin",
      }}
    >
      <Button
        variant={selectedCategory === "All" ? "dark" : "outline-dark"}
        size="sm"
        className="rounded-pill px-3 text-nowrap"
        onClick={() => onSelectCategory("All")}
      >
        All
      </Button>

      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "dark" : "outline-dark"}
          size="sm"
          className="rounded-pill px-3 text-nowrap"
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}

export default CategoryFilter;
