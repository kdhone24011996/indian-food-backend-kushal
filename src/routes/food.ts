import { Router } from "express";
// import { foodService } from "../service/food";
import { getAllFoods, getFoodById, addFood, getSearchedIngredients, foodSuggester } from "../apiControllers/food";
const router = Router();
router.post('/',addFood)
router.get('/',getAllFoods)
router.get('/suggester/:arr',foodSuggester)
router.get('/ingredients',getSearchedIngredients)
router.get('/:id',getFoodById)

// router.get('/repairDB',async()=>{
//  const response = await foodService.find({},1,1000)
//       for(const data of response.data){
//         const ingredients = data.ingredients
//         const newIngredients = []
//         ingredients.forEach(ingredient=>{
//           let item = ingredient.trim().toLowerCase()
//           newIngredients.push(item)
//           console.log(typeof item)
//           console.log(item)
//         })
//         data.ingredients = newIngredients
//         if(data.flavor_profile === -1 || data.flavor_profile === "-1" ) data.flavor_profile = ''
//         // console.log('count')
//         await data.save()
//       }
//       console.log('done')
// })

export default router