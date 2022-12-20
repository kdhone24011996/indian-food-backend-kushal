import { Router } from "express";
import { getAllCategories, getCategoryAndTaskCount, postCategory, putCategory } from "../apiControllers/category";
const router = Router();

router.post('/',postCategory)
router.get('/',getAllCategories)
// will only show categories having number of tasks greater than or equal to 1
router.get('/category_wise_task_count',getCategoryAndTaskCount)
router.put('/:id',putCategory)

export default router