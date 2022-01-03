// Storage Controller
// create later

// Item Controller
const ItemCtrl = (function(){
	// Item Constructor
	const Item = function(id, name, calories){
		this.id = id
		this.name = name
		this.calories = calories
	}

	// Data Structure
	const data = {
		items: [
			{id: 0, name: 'Steak Dinner', calories: 1200},
			{id: 1, name: 'Cookie', calories: 400},
			{id: 2, name: 'Eggs', calories: 300},
		],
		total: 0
	}

	return {
		getItems: function(){
			return data.items
		},
		addItem: function(name, calories){
			let ID;
			// create ID
			if(data.items.length > 0){
				ID = data.items[data.items.length -1].id + 1
			}else {
				ID = 0
			}
			// parse calories into int
			calories = parseInt(calories)
			newItem = new Item(ID, name, calories)
			// add item to data items
			data.items.push(newItem)
			return newItem
		},
		logData: function(){
			return data
		}
	}
})();


// UI Controller
const UICtrl = (function(){
	// UI selectors
	const UISelectors = {
		itemNameInput: "#item-name",
		itemCaloriesInput: "#item-calories",
		addBtn: ".add-btn"
	}
	return {
		populateItemList: function(items){
			// create html content
			let html = '';

			// parse data and create list items html
			items.forEach(function(item){
				html += `<li class="collection-item" id="item-${item.id}">
				<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
				<a href="#" class="secondary-content">
					<i class="edit-item fa fa-pencil"></i>
				</a>
				</li>`;
			});

			// insert list items
			document.querySelector("#item-list").innerHTML = html;
		},
		getItemInput: function(){
			return {
				name: document.querySelector(UISelectors.itemNameInput).value,
				calories: document.querySelector(UISelectors.itemCaloriesInput).value
			}
		},
		getSelectors: function(){
			return UISelectors
		}
	}
})();


// App Controller
const App = (function(ItemCtrl, UICtrl){
	// load event listeners
	const loadEventListeners = function(){
		// Get UI Selectors
		const UISelectors = UICtrl.getSelectors()
		console.log(UISelectors)
		// add item event
		document.querySelector(UISelectors.addBtn)
			.addEventListener("click", itemAddSubmit)
	}
	// add item submit
	const itemAddSubmit = function(e){
		// get form input from UI controller
		const input = UICtrl.getItemInput()
		// check name and calorie input
		if(input.name !== "" && input.calories !== ""){
			const newItem = ItemCtrl.addItem(input.name, input.calories)
			console.log(newItem)
		}

		event.preventDefault()
	}
	return {
		init: function(){
			console.log("initializing App")
			const items = ItemCtrl.getItems()
			console.log(items)
			UICtrl.populateItemList(items)
			// load event listeners
			loadEventListeners()
		}
	}
})(ItemCtrl, UICtrl);

// Initialize App
App.init() 
