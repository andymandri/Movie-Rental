const ListGroup = (props) => {
  const { listItems, onItemSelection, selectedItem } = props;
  return (
    <ul className="list-group">
      {listItems.map((item) => (
        <li
          className={
            selectedItem === item.name
              ? "list-group-item active"
              : "list-group-item"
          }
          style={{ cursor: "pointer" }}
          key={item._id}
          onClick={() => onItemSelection(item.name)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
