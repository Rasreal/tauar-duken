import { ITextInput } from "@/UI/form_hook/utils/types";
import {
  nameMax,
  nameMin,
  required,
} from "@/UI/form_hook/utils/validation/errText";

const validations = {
  validation_type: "string",
  validations: [
    {
      type: "required",
      params: [required],
    },
    {
      type: "min",
      params: [2, nameMin],
    },
    {
      type: "max",
      params: [50, nameMax],
    },
  ],
};

export const formData: ITextInput[] = [
  {
    name: "title",
    label_text: "Название продукта",
    placeholder: "Введите название",
    ...validations,
  },
  {
    name: "description",
    label_text: "Описание продукта",
    placeholder: "Введите описание",
    validations: [
      {
        type: "required",
        params: [required],
      },
      {
        type: "min",
        params: [2, nameMin],
      },
      {
        type: "max",
        params: [500, nameMax],
      },
    ],
  },
  {
    name: "brand",
    label_text: "Бренд продукта",
    placeholder: "Введите название бренда",
    ...validations,
  },
  {
    name: "price",
    label_text: "Стоимость продукта",
    placeholder: "Введите стоимость",
    validation_type: "number",
    validations: [
      {
        type: "typeError",
        params: ["Введите число"],
      },
      {
        type: "required",
        params: [required],
      },
    ],
  },
];
