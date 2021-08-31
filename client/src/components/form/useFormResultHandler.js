// TODO: Doc
//
// # Usage with all args:
//
// handleServerSideError({
//   setFieldError: setError,
//   errorObject: err,
//   crudAction: "create"
//   modelName: "Community",
//   fbErrorNotice: {
//     title: "Failed to create Community",
//     msg: `The community couldn't be created - an unexpected error occured`,
//     toastCntId: "modalNotificationCnt",
//   },
// });
//
// # Usage with minum args:
//
// handleServerSideError({
//   setFieldError: setError,
//   errorObject: err,
// });

import useNotify from "../notifications/useNotify";

export default function useFormResultHandler(props) {
  let { modelName = "Object", crudAction = "modify", setFieldError } = props;
  const { notifyError, notifySuccess } = useNotify();

  function handleFormSuccess(props) {
    let { objectName, title, msg, toastCntId = "appNotificationCnt" } = props;

    notifySuccess({
      title: title ?? `${modelName} ${crudAction}ed`,
      msg:
        msg ??
        `The ${modelName} '${
          objectName ?? null
        }' was successfully ${crudAction}ed`,
      toastCntId: toastCntId,
    });
  }

  function handleFormError(props) {
    let {
      errorObject,
      title,
      msg,
      toastCntId = "modalNotificationCnt",
    } = props;

    const serverErrorsObj = errorObject?.response?.data;
    if (serverErrorsObj?.errors) {
      Object.entries(serverErrorsObj.errors).forEach(([errorField, error]) => {
        console.log("errorField: ", errorField);
        console.log("error: ", error);
        setFieldError(errorField, {
          type: "server",
          message: `${
            error?.message ?? `Something went wong with ${errorField}`
          }`,
        });
      });
    } else {
      console.log(
        `Couldn't create a new '${modelName}' - something went wrong: ${errorObject}`
      );

      notifyError({
        title: title ?? `Failed to ${crudAction} ${modelName}`,
        msg:
          msg ??
          `The ${modelName} couldn't be ${crudAction}ed - an unexpected error occured`,
        toastCntId: toastCntId,
      });
    }
  }

  return { handleFormSuccess, handleFormError };
}
