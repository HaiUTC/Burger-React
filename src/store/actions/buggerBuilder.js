import * as ActionTypes from './actionTypes'
import axios from '../../axios-orders'


export const addIngredient = name =>{
    return {
        type : ActionTypes.ADD_INGREDIENTS,
        ingredientName : name
    }
}

export const removeIngredient = name =>{
    return {
        type : ActionTypes.REMOVE_INGREDIENTS,
        ingredientName : name
    }
}

export const setIngredient = (ingredients) =>{
    return {
        type : ActionTypes.SET_INGREDIENTS,
        ingredients : ingredients
    }
}

export const initIngredient = () =>{
    return dispatch =>{
        axios.get('/ingredients.json')
        .then(res =>{
            dispatch(setIngredient(res.data))
        })
        .catch(err =>{
            dispatch(fetchIngredientsFailed())
        })
    }
}

export const fetchIngredientsFailed = () =>{
    return {
        type : ActionTypes.FETCH_INGREDIENTS

    }
}