import { Request, Response, NextFunction } from "express";
import { check } from "express-validator";
import { foodService } from "../service/food";
import { apiError, apiValidation, apiOk, mongoID } from "../service/apiHelper";
import { catchAsync } from "../service/apiHelper";
import { IFood } from "../models/food";

export const addFood = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // await check("name", "name is required").exists().run(req);
    // await check("parent", "parent is required").exists().run(req);
    // await check("image", "image is required").exists().run(req);
    // await check("filters", "filters must be the array").isArray().run(req);
    apiValidation(req, res);

    try {
      const {
        name,
        ingredients,
        diet,
        flavor_profile,
        course,
        prep_time,
        cook_time,
        state = "",
        region = "",
      } = req.body as IFood;

      const response = await foodService.create({
        name,
        ingredients,
        diet,
        flavor_profile,
        course,
        prep_time,
        cook_time,
        state,
        region,
      });
      if (response) {
        apiOk(res, response);
      }
    } catch (err) {
      apiError(res, err, 500);
    }
  }
);
export const getAllFoods = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await check("page", "page must be an integer greater than 0")
      .optional()
      .isInt({ gt: 0 })
      .run(req);
    await check("perPage", "perPage must be an integer greater than 0")
      .optional()
      .isInt({ gt: 0 })
      .run(req);
    apiValidation(req, res);

    let page = req.query.page || 1;
    let perPage = req.query.perPage || 10;
    page = parseInt(page as string);
    perPage = parseInt(perPage as string);
    const filter: any = req.query.filter;
    let cond: any = {};
    if (filter) {
      cond = JSON.parse(filter);
    }

    try {
      const foodResponse = await foodService.find(cond, page, perPage);
      apiOk(res, foodResponse);
    } catch (err) {
      apiError(res, err);
    }
  }
);
export const getSearchedIngredients = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await check("text", "text is required").exists().run(req);
    apiValidation(req, res);

    const text: any = req.query.text;

    try {
      const ingredientResponse = await foodService.getIngredientOptions(text);
      apiOk(res, ingredientResponse);
    } catch (err) {
      apiError(res, err);
    }
  }
);
export const foodSuggester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await check("ingredients", "ingredients is required").exists().run(req);
    apiValidation(req, res);

    let ingredients: any = req.query.ingredients;
    if (typeof ingredients === "string") {
      ingredients = [ingredients];
    }
    console.log(ingredients);
    try {
      const ingredientResponse =
        await foodService.foodSuggestionFromIngredients(ingredients);
      apiOk(res, ingredientResponse);
    } catch (err) {
      apiError(res, err);
    }
  }
);

export const getFoodById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await check("id", "id is required")
      .exists()
      .customSanitizer(mongoID)
      .run(req);

    apiValidation(req, res);

    try {
      const result = await foodService.findById(req.params.id);
      apiOk(res, result);
    } catch (error) {
      apiError(res, error, 500);
    }
  }
);
