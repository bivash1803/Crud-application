import React from "react";


const ListItem = (props) => {
  return (
    <li className="list-group-item">
      <button className="btn-sm m-4 btn btn-info" onClick={props.editTodo}>
        u
      </button>

      {props.item.Name}
      <button className="btn-sm m-4 btn btn-danger" onClick={props.deleteTodo}>
        x
      </button>
    </li>
  );
};

export default ListItem;
