import "./BackOffice.scss";

import CategoryBo from "./CategoryBo/CategoryBo";
import TagBo from "./TagBo/TagBo";
const BackOffice = () => {
  return (
    <div className="BackOffice">
      <CategoryBo />
      <TagBo />
    </div>
  );
};

export default BackOffice;
