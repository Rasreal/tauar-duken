import clsx from "clsx";
import { FC, useId } from "react";
import style from "@/UI/form_hook/Form.module.scss";
import { ITextInput } from "@/UI/form_hook/utils/types";
import useGetFieldData from "@/UI/form_hook/hook/fieldData";

import { checkArr } from "@/service/checkArr";
import { useController, useFormContext } from "react-hook-form";

const File: FC<ITextInput> = ({ ...props }) => {
  const { modifier, ...input_props } = props;
  const { isError } = useGetFieldData(props.name);
  const id = useId();
  const { register } = useFormContext();

  const {
    field: { value },
  } = useController({
    name: props.name,
  });

  const checkValue = (value: File[]) => {
    return Object.keys(value).map((key) => {
      const elm = value[Number(key)];
      return elm.constructor.name === "File" ? elm.name : "";
    });
  };

  const label_list = checkValue(value);

  return (
    <div
      className={clsx(
        style.file,
        modifier && style[`file--${modifier}`],
        isError && style["file--error"],
      )}
    >
      <input id={id} type="file" {...register(props.name)} {...input_props} />
      <span
        className={clsx(
          style.file__placeholder,
          !checkArr(label_list) && style["file__placeholder--empty"],
        )}
      >
        {checkArr(label_list) ? (
          <>
            {label_list.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </>
        ) : (
          <>Загрузить</>
        )}
      </span>
    </div>
  );
};
export default File;
