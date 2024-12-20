import clsx from "clsx";
import { FC, MouseEvent } from "react";
import style from "./Products.module.scss";
import { ICard } from "@/types";
import Del from "./Del";
import { Link } from "react-router-dom";
import { filterPath, paths } from "@/paths";
import img from "@/images/img.png";
import LazyLoad from "react-lazyload";
import Like from "./Like";
import { useAppSelector } from "@/hooks/hook";

const Card: FC<ICard> = ({ ...props }) => {
  const { title, thumbnail, description, price, id, like } = props;
  const { filter } = useAppSelector((state) => state.card);

  const handle = (e: MouseEvent) => {
    if (filter !== filterPath.delete) return;
    e.preventDefault();
  };

  return (
    <div className={clsx(style.card)}>
      <Link
        onClick={handle}
        className={clsx(style.card__link)}
        to={`/${paths.products}/${id}`}
      >
        {filter !== filterPath.delete && (
          <>
            {filter !== filterPath.like && <Del id={id} />}

            <Like id={id} like={like} />
          </>
        )}

        <figure className={clsx(style.card__image)}>
          <LazyLoad once scroll>
            <img src={thumbnail || img} alt={title} />
          </LazyLoad>
        </figure>

        <div className={clsx(style.card__content)}>
          <h3 className={clsx(style.card__title)}>{title}</h3>

          <div className={clsx(style.description)}>
            <p className={clsx(style.description__text)}>{description}</p>
          </div>

          <div className={clsx(style.price)}>
            <p className={clsx(style.price__label)}>Бағасы</p>
            <p className={clsx(style.price__value)}>{`${price} теңге`}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default Card;
