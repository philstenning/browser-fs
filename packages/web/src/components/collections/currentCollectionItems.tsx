import { fsaFile } from "fsa-database";
import { useCollections, useFsaDbContext } from "react-fsa-database";
//@ts-ignore
// import styles from "./currentCollectionItems.module.css";
function CollectionItems() {
  const { currentCollectionItems, removeFileFromCollection } = useCollections();
  const { dbState, setCurrentFileId } = useFsaDbContext();

  const removeItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    file: fsaFile
  ) => {
    e.stopPropagation();
    removeFileFromCollection(file);
  };

  return (
    <div data-testid="currentCollectionItems">
      <h4>Collection Items</h4>
      {/* currentCollectionItems */}
      <ul>
        {currentCollectionItems.map((item, index) => (
          <li
            data-testid={`collectionItem-${index}`}
            key={item.id}
            className={`${dbState.currentFileId === item.id ? "active" : ""} ${
              item.hidden === "true" ? "hidden" : ""
            }`}
            onClick={() => setCurrentFileId(item.id)}
          >
            {item.order} {item.name}{" "}
            <button
              onClick={(e) => removeItem(e, item)}
              data-testid={`collectionItem-${index}-btnRemove`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CollectionItems;
