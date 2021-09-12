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
//     message: `The community couldn't be created - an unexpected error occured`,
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
import _ from "lodash";

export default function useFormResultHandler(props) {
  let { modelName = "Object", crudAction = "modify", setFieldError } = props;
  const { notifyError, notifySuccess } = useNotify();

  function handleFormSuccess(props) {
    let {
      objectName,
      title,
      message,
      toastCntId = "appNotificationCnt",
    } = props;

    notifySuccess({
      title: title ?? `${modelName} ${crudAction}d`,
      message:
        message ??
        `The ${modelName} '${
          objectName ?? null
        }' was successfully ${crudAction}d`,
      toastCntId: toastCntId,
    });
  }

  function handleFormError(props) {
    let {
      errorObject,
      objectId,
      title,
      message,
      toastCntId = "modalNotificationCnt",
    } = props;

    const serverErrorsObj = errorObject?.response?.data;
    if (serverErrorsObj?.errors) {
      Object.entries(serverErrorsObj.errors).forEach(([errorField, error]) => {
        let errMsg = null;
        if (error) {
          errMsg = _.isString(error) ? error : error?.message;
        }
        setFieldError(errorField, {
          type: "server",
          message: errMsg ?? `Something went wong with ${errorField}`,
        });
      });
    } else {
      // TODO: log that in an error log and notify via e-mail!
      console.log(
        `Couldn't ${crudAction} '${modelName}' - something went wrong:\nError: ${errorObject}\nobjectId: ${objectId}`
      );

      notifyError({
        title: title ?? `Failed to ${crudAction} ${modelName}`,
        message:
          message ??
          `The ${modelName} couldn't be ${crudAction}d - an unexpected error occured`,
        toastCntId: toastCntId,
      });
    }
  }

  return { handleFormSuccess, handleFormError };
}
