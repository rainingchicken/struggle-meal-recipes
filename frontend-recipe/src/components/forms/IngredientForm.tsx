const IngredientForm = () => {
  return (
    <>
      <label htmlFor="unit">Unit</label>
      <input type="number" id="unit" />
      <label htmlFor="amount">Amount</label>
      <input type="number" id="amount" />
      <label htmlFor="ingredient">Ingredient name</label>
      <input type="text" id="ingredient" />
    </>
  );
};

export default IngredientForm;
