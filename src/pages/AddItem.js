import React from 'react';
import Form from "../../src/components/AddItemForm";

const AddItem = (props) => {
  return (
	<div>
    <Form token={props.token}/>
	</div>
  )
};

export default AddItem;