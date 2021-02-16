import React from 'react'
const NewBatchProducts = ({ products, newBatchProducts, setNewBatchProducts }) => {

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...newBatchProducts];
    list[index][name] = value;
    setNewBatchProducts(list);
  };

  const handleRemoveClick = index => {
    const list = [...newBatchProducts];
    list.splice(index, 1);
    setNewBatchProducts(list);
  };

  const handleAddClick = () => {
    setNewBatchProducts([...newBatchProducts, { productName: '', usedWeight: '' }]);
  }
  return (
    <div className="NewBatchProducts">

      {newBatchProducts.map((x, i) => {
        return (
          <div key={`${x}${i}`}>
            <label>Used product
            <input
                type="text"
                name="productName"
                placeholder="Malt"
                value={x.productName}
                onChange={e => handleInputChange(e, i)}
                list="opts"
              />
            </label>
            <datalist id="opts">
              {products.reverse().sort(function (a, b) {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
              }).map(p => <option key={p.id}>{p.name}</option>)}
            </datalist>
            <label>Used weight (g)
            <input
                pattern="[0-9]*\.?[0-9]?[0-9]?"
                name="usedWeight"
                placeholder="1000"
                value={x.usedWeight}
                onChange={e => handleInputChange(e, i)}
              />
            </label>
            {newBatchProducts.length !== 1 && <button type="button"
              onClick={() => handleRemoveClick(i)}>-</button>}
            {newBatchProducts.length - 1 === i && <button onClick={handleAddClick}>+</button>}
          </div>
        );
      })}
    </div>
  )

}

export default NewBatchProducts