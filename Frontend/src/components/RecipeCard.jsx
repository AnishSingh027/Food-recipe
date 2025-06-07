import { Link } from "react-router-dom";

const RecipeCard = ({ item }) => {
  const { title, description, category, image, _id, createdBy } = item;
  return (
    <div className="flex gap-5 flex-wrap">
      <div
        key={_id}
        className="card bg-base-100 w-80 image-full h-64 shadow-sm"
      >
        <figure>
          <img src={image} className="w-full" alt="Shoes" />
        </figure>
        <div className="card-body relative">
          <h2 className="card-title">{title}</h2>
          <p>
            {description.length <= 100
              ? description
              : description.substring(0, 100)}
            {description.length > 100 && "..."}
          </p>

          <div className="card-actions flex justify-between items-center  w-full">
            <div className="flex justify-between items-center gap-3">
              <p className="font-bold">Chef: {createdBy?.firstName}</p>
              <p>{category === "veg" ? "🟢" : "🔴"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
