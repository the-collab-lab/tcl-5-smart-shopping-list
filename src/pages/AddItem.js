import React from 'react';
import Form from "../../src/components/AddItemForm";
import { tsPropertySignature } from '@babel/types';

const AddItem = (props) => {
  return (
	<div>
    <Form />
    {/* <Form token={props.token}/> */}
	</div>
  )
};

export default AddItem;