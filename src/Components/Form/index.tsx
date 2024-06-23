import { Fragment, useState } from "react";

interface dynamicObject {
  [key: string]: any;
  // | number | object | string[] | number[] | object[];
}

interface inputProps {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  defaultValue?: any;
  options?: string[];
  inputs?: inputProps[];
}

interface props {
  inputs: inputProps[];
  onSubmit: ({}) => void;
}

const Form = ({ inputs, onSubmit }: props) => {
  const [formValues, setFormValues] = useState<dynamicObject>({});

  return (
    <form
      className="my-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formValues);
      }}
    >
      {inputs.map(
        (
          {
            name,
            label,
            type,
            options,
            inputs,
            required,
            defaultValue,
            ...rest
          },
          i
        ) => (
          <Fragment key={i}>
            <label className="form-label text-start w-100 mt-4">
              {label}
              {required ? <span className="ms-1 text-danger"> *</span> : ""}
            </label>

            {type === "select" ? (
              <select
                name={name}
                className="form-control"
                value={formValues[name]}
                onChange={(e) =>
                  setFormValues((current) => ({
                    ...current,
                    [name]: e.target.value,
                  }))
                }
                required={required}
                defaultValue={defaultValue}
                {...rest}
              >
                <option>Please Choose...</option>

                {options?.map((option, x) => (
                  <option value={option} key={x}>
                    {option}
                  </option>
                ))}
              </select>
            ) : type === "dynamicList" ? (
              <table className="table table-responsive">
                <thead>
                  <tr>
                    {inputs?.map((input, x) => (
                      <th key={x}>
                        {input.label}
                        {input.required ? (
                          <span className="ms-1 text-danger"> *</span>
                        ) : (
                          ""
                        )}
                      </th>
                    ))}

                    <th
                      role="button"
                      onClick={() =>
                        setFormValues((current) => ({
                          ...current,
                          [name]: formValues[name]
                            ? [...formValues[name], {}]
                            : [{}],
                        }))
                      }
                      className="bg-success text-white"
                    >
                      Add
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {formValues[name]?.map((value: dynamicObject, x = 0) => (
                    <tr key={x}>
                      {inputs?.map((input, y) => (
                        <td key={y}>
                          <input
                            {...input}
                            name={input.name}
                            value={value[input.name]}
                            onChange={(e) =>
                              setFormValues((current) => ({
                                ...current,
                                [name]: current[name].map((ele = {}, z = 0) =>
                                  z === x
                                    ? {
                                        ...ele,
                                        [input.name]: e.target.value,
                                      }
                                    : ele
                                ),
                              }))
                            }
                            required={input.required}
                            defaultValue={input.defaultValue}
                            className="form-control"
                          />
                        </td>
                      ))}

                      <td
                        role="button"
                        onClick={() =>
                          setFormValues((current) => ({
                            ...current,
                            [name]: current[name].filter(
                              (_ = {}, z = 0) => z !== x
                            ),
                          }))
                        }
                        className="bg-danger text-white"
                      >
                        Delete
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <input
                name={name}
                type={type}
                value={formValues[name]}
                onChange={(e) =>
                  setFormValues((current) => ({
                    ...current,
                    [name]: e.target.value,
                  }))
                }
                className="form-control"
                required={required}
                defaultValue={defaultValue}
                {...rest}
              />
            )}
          </Fragment>
        )
      )}

      <button className="btn btn-light float-end my-4" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
