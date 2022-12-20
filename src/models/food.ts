import { model, Schema, Document, Types } from "mongoose";

export enum DietTypes {
  VEGITARIAN = "vegetarian",
  NON_VEGITARIAN = "non vegetarian",
}

export enum FlavorProfileTypes {
  SWEET = "sweet",
  SPICY = "spicy",
  BITTER = "bitter",
  SOUR = "sour",
  OTHER = "",
}

export enum CourseTypes {
  DESSERT = "dessert",
  MAIN_COURSE = "main course",
  SNACK = "snack",
  STARTER = "starter"
}

export interface IFood {
  name: string;
  ingredients:string[],
  diet:DietTypes,
  flavor_profile:FlavorProfileTypes,
  course:CourseTypes,
  prep_time:number,
  cook_time:number,
  state:string,
  region:string
}


export interface IFoodDoc extends IFood, Document {}
const schemaFields: Record<keyof IFood, any> = {
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  diet: {type:String, enum:Object.values(DietTypes), required: true },
  flavor_profile: {type:String, enum:Object.values(FlavorProfileTypes) },
  course: {type:String, enum:Object.values(CourseTypes), required: true },
  prep_time: { type: Number, required: true },
  cook_time: { type: Number, required: true },
  state: { type: String },
  region: { type: String },
};

const schema = new Schema(schemaFields, { timestamps: true });

export const Food = model<IFoodDoc>("Indian_food", schema);