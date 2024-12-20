/* eslint-disable @typescript-eslint/no-explicit-any */
import useGetArray from "@/hooks/getAll";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { filterPath } from "@/paths";
import { checkArr } from "@/service/checkArr";
import { setPage, setTotalFiltered } from "@/store/card/cardSlice";
import { ICard } from "@/types";
import Field from "@/UI/form_hook/hoc/Field";
import { ITextInput } from "@/UI/form_hook/utils/types";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Search: FC = () => {
  const dispatch = useAppDispatch();
  const { ...methods } = useForm({
    mode: "onChange",
    defaultValues: { search: "" },
  });

  const { reset } = methods;

  const { filteredList } = useGetArray();
  const { filter, deletes, likes } = useAppSelector((state) => state.card);

  const field: ITextInput = {
    name: "search",
    placeholder: "Тауар атың жазыңыз",
    onInput: (e) => {
      const value = (e.target as any).value;
      dispatch(setPage(1));
      const list: ICard[] = [];
      switch (filter) {
        case filterPath.like:
          list.push(...filteredList.filter((item) => item.like));
          break;

        case filterPath.all:
          list.push(...filteredList);
          break;

        case filterPath.delete:
          list.push(
            ...filteredList.filter((item) => deletes.includes(item.id)),
          );
          break;
      }

      if (value.length === 0) {
        dispatch(setTotalFiltered(list));
        return;
      }

      const searchList = list.filter((item) => {
        const words = item.title.split(" ");
        return checkArr(
          words.filter((el) => {
            return el.toLowerCase().startsWith(value.toLowerCase());
          }),
        );
      });

      dispatch(setTotalFiltered(searchList));
    },
  };

  useEffect(() => {
    reset({ search: "" });
  }, [filter, reset, deletes, likes]);

  return (
    <FormProvider {...methods}>
      <Field {...field} />
    </FormProvider>
  );
};
export default Search;
