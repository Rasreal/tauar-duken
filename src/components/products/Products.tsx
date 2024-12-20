import clsx from "clsx";
import style from "./Products.module.scss";
import { FC } from "react";
import Title from "@/UI/title/Title";
import Card from "./Card";
import { ICard } from "@/types";
import Drop from "./Drop";
import { useAppSelector } from "@/hooks/hook";
import { checkArr } from "@/service/checkArr";
import { changes, paths } from "@/paths";
import { Link } from "react-router-dom";
import PaginationComponent from "./Paginations";
import Search from "./Search";

const Products: FC = () => {
  const { arrayPagination } = useAppSelector((state) => state.card);

  return (
    <section className={clsx(style.products)}>
      <div className={clsx(style.products__inner, "container")}>
        <Title label={"тауар тізімі"}>
          <Drop />
          <Search />
        </Title>

        <div className={clsx(style.content)}>
          {checkArr(arrayPagination) &&
            arrayPagination.map((item: ICard) => {
              return <Card key={item.id} {...item} />;
            })}
        </div>

        <PaginationComponent />

        <div className={clsx(style.create)}>
          <Link
            to={`/${paths.create}`}
            className={clsx(style.create__btn)}
            state={{ value: changes.create }}
          >
            Тауарды қосу
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
