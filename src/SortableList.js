import { Sortable } from "@shopify/draggable";

let sortable = null;

const SortableList = ({
  draggableSelector,
  indexAttribute,
  onSort,
  children,
}) => {
  const initSortable = (containerEl) => {
    if (sortable) return;

    sortable = new Sortable(containerEl, {
      draggable: draggableSelector,
    }).on("sortable:sorted", onDragSorted);
  };

  const onDragSorted = ({ data }) => {

    

    const { dragEvent } = data;
    const { over, source } = dragEvent;

    const overIndex = over.getAttribute(indexAttribute);
    const sourceIndex = source.getAttribute(indexAttribute);

    source.setAttribute(indexAttribute, overIndex);

    onSort(sourceIndex, overIndex);
  };

  return children({ initSortable: initSortable });
};

export default SortableList;
