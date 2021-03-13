import React from 'react';
import Popover from 'react-popover';
import Category from './Category';
import "./CategoryList.scss";
import beep from './beep.js';

function CategoryList(props) {

  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [newCategoryName, setNewCategoryName] = React.useState('');

  const handleAddClick = () => {
    setIsAddOpen(true);
  };
  
  const handleNewCategoryNameChange = (evt) => {
    setNewCategoryName(evt.target.value);
  }

  const handleNewCategoryKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      handleSaveClick();
    }
  }

  const handleSaveClick = () => {
    if (newCategoryName === '') {
      var snd = new Audio(beep);
      snd.play();
    } else {
      setIsAddOpen(false);
      props.onAdd({
        name: newCategoryName
      });
      setNewCategoryName('');
    }
  }

  const handlePopoverOuterAction = () => {
    setIsAddOpen(false);
    setNewCategoryName('');
  }

  return (
    <div className="Categories">
      {props.list.map((category) => 
        <Category
          key={category.id}
          {...category}
          selected={category.id === props.selected}
          onSelect={props.onSelect}
        />
      )}
      <div className="horiz-spacer" />
      <div className="footer">
        <Popover
          isOpen={isAddOpen}
          preferPlace="above"
          children={
            <button
              className="add"
              title="Add New Category"
              onClick={handleAddClick}
            >
              +
            </button>
          }
          body={
            <div className="add-category popover">
              <input
                type="text"
                maxLength="24"
                autoFocus
                onChange={handleNewCategoryNameChange}
                onKeyPress={handleNewCategoryKeyPress}
              />
              <button
                className="apply"
                title="Save"
                onClick={handleSaveClick}
              >
                &#10003;
              </button>
            </div>
          }
          onOuterAction={handlePopoverOuterAction}
        />
      </div>
    </div>
  );
}

export default CategoryList;
