import React from 'react';
import { useForm } from 'react-hook-form'
const AddItem = () => {
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = data => { console.log(data) }

  console.log(watch('example')) // watch input value by passing the name of it

  return (
	<div>
    {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
    <form onSubmit={handleSubmit(onSubmit)}>
    {/* register your input into the hook by invoking the "register" function */}
      <input name="name of item" defaultValue="" ref={register} />
      
      <select name="How soon" ref={register}>How soon are you likely to buy it again?
        <option value="7">Soon (in the next 7 days)</option>
        <option value="14">Kind of soon (in the next 14 days)</option>
		<option value="30">Not soon (in the next 30 days)</option>
      </select>

      
      <input type="submit" />
    </form>
	</div>
  )
};

export default AddItem;