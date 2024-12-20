import { useGetProductsQuery } from "@/store/rtk/products/api";
import { useAppSelector } from "./hook";
import { ICard } from "@/types";
import { filterPath } from "@/paths";

const useGetArray = () => {
  const { data, isSuccess } = useGetProductsQuery({});
  const { deletes, likes, arrayCreated, filter } = useAppSelector(
    (state) => state.card,
  );

  let arr: ICard[] = [];

  if (!isSuccess) return { filteredList: [] };

  if (filter === filterPath.like) {
    arr = [...data.products, ...arrayCreated]
      .filter((item) => likes.includes(item.id))
      .map((item) => {
        return { ...item, like: likes.includes(item.id) };
      });
    return { filteredList: arr };
  }

  if (filter === filterPath.delete) {
    arr = [...data.products, ...arrayCreated].filter((item) =>
      deletes.includes(item.id),
    );

    return { filteredList: arr };
  }

  arr = [...data.products, ...arrayCreated]
    .filter((item) => !deletes.includes(item.id))
    .map((item) => {
      return { ...item, like: likes.includes(item.id) };
    });

  return { filteredList: arr };
};

export default useGetArray;
