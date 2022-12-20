import { Model } from "mongoose";
import { DatabaseService } from "./database";
import { IFood, IFoodDoc, Food } from "../models/food";

class FoodService extends DatabaseService<IFood, IFoodDoc> {
  constructor(model: Model<IFoodDoc>) {
    super(model);
  }

  public getIngredientOptions = async (text: string) => {
    return await this.model.aggregate([
      {
        $unwind: {
          path: "$ingredients",
        },
      },
      {
        $group: {
          _id: "$ingredients",
        },
      },
      {
        $match: {
          _id: new RegExp(text, "i"),
        },
      },
      {
        $limit: 10,
      },
    ]);
  };

  // foods that we can make from a given ingredients set
  public foodSuggestionFromIngredients = async (ingredients: string[]) => {
    return await this.model.aggregate([
      {
        $project: {
          name: 1,
          matchedFoods: {
            $setIsSubset: ["$ingredients", ingredients],
          },
        },
      },
      {
        $match: {
          matchedFoods: true,
        },
      },
    ]);
  };
}

export const foodService = new FoodService(Food);
