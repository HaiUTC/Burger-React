import * as ActionTypes from '../actions/actionTypes'
import { updateObject} from '../utility'
const initialState = {
    ingredients : null,
    totalPrice: 4,
    error : false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.4,
    bacon: 2.0
}

const addIngredients = (state,action) =>{
    const updateIngredient = { [action.ingredientName] : state.ingredients[action.ingredientName] +1 }
    const updateIngredients = updateObject(state.ingredients,updateIngredient)
    const updateState = {
        ingredients : updateIngredients,
        totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state,updateState)
}

const removeIngredients = (state,action) =>{
    const updateIng = { [action.ingredientName] : state.ingredients[action.ingredientName] -1 }
            const updateIngs = updateObject(state.ingredients,updateIng)
            const updateSta = {
                ingredients : updateIngs,
                totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state,updateSta)
}

const setIngredients = (state,action) =>{
    return updateObject(state, {
        ingredients : {
            salad : action.ingredients.salad,
            bacon : action.ingredients.bacon,
            cheese : action.ingredients.cheese,
            meat : action.ingredients.meat
        },
        totalPrice : 4.0,
        error : false
    })
}

const fetchIngredients = (state,action) =>{
    return updateObject(state, {error : true})
}


const reducer = (state = initialState, action) =>{
    switch(action.type){

        case ActionTypes.ADD_INGREDIENTS : return addIngredients(state, action)
           
        case ActionTypes.REMOVE_INGREDIENTS : return removeIngredients(state,action)
            
        case ActionTypes.SET_INGREDIENTS :  return setIngredients(state,action)
               
        case ActionTypes.FETCH_INGREDIENTS : return fetchIngredients(state,action)
               
        default : return state
    }
}

export default reducer