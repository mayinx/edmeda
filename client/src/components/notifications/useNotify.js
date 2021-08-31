// TODO: Anwer SO question by showing that it's quite easy to deliver toasts from a custom hook (react-toastify) - no ToastProvider needed
// SO: https://stackoverflow.com/questions/62820758/how-can-i-use-react-toastify-from-hook
//
// Prerequisites:
//
// 1. In App.js
//
//  import { ToastContainer, toast } from "react-toastify";
//  import "react-toastify/dist/ReactToastify.css";
//  import "../notifications/ReactToastifyOverrides.css";
//  ...
//           <ToastContainer
//               enableMultiContainer
//               containerId={"appNotificationCnt"}
//               ...
//               ...
//             />
//
// 2. In your component (e.g. MyNiceComponent.js)
//
//  import useNotify from "../notifications/useNotify";
//
//  export default function MyNiceComponent(){
//       const { notify, notifyError, notifySuccess } = useNotify();
//
//       notifyError({
//         title: "Login failed",
//         msg: `Couldn't login user: ${errMsg}`,
//       });
//
//       notifySuccess({
//         title: "Login successfull",
//         msg: "Welcome to Edmeda - happy socializing",
//       });
//
//       // or:
//       notify({
//         type: "success",
//         title: "Login successfull",
//         msg: "Welcome to Edmeda - happy socializing",
//       });
//
// }

import { toast } from "react-toastify";

export default function useNotify() {
  const notify = (props) => {
    const { type, title, msg, toastId, toastCntId } = props;

    switch (type) {
      case "success":
        return toast.success(
          <div>
            <h3>{title ?? "Success"}</h3>
            <div>{msg ?? "Action successfully performed"}</div>
          </div>,
          {
            theme: "colored",
            toastId: toastId ?? type,
            containerId: toastCntId ?? "appNotificationCnt",
          }
        );
      case "error":
        return toast.error(
          <div>
            <h3>{title ?? "Error"}</h3>
            <div>{msg ?? "An error occured."}</div>
          </div>,
          {
            theme: "colored",
            toastId: toastId ?? type,
            containerId: toastCntId ?? "appNotificationCnt",
          }
        );
      case "warn":
        return toast.warn(
          <div>
            <h3>{title ?? "Warning"}</h3>
            <div>
              {msg ??
                "Yeah - funny thing: I'm supposed to warn you about somethimg - but got no clou, what that might be! Just know this: Be warned ;-)"}
            </div>
          </div>,
          {
            theme: "colored",
            toastId: toastId ?? type,
            containerId: toastCntId ?? "appNotificationCnt",
          }
        );
      case "warn":
        return toast.info(
          <div>
            <h3>{title ?? "Warning"}</h3>
            <div>
              {msg ??
                "Yeah - funny thing: I'm supposed to warn you about somethimg - but got no clou, what that might be! Just know this: Be warned ;-)"}
            </div>
          </div>,
          {
            theme: "colored",
            toastId: toastId ?? type,
            containerId: toastCntId ?? "appNotificationCnt",
          }
        );
      default:
        return toast.info(
          <div>
            <h3>{title}</h3>
            <div>{msg}</div>
          </div>,
          {
            theme: "colored",
            toastId: toastId ?? type,
            containerId: toastCntId ?? "appNotificationCnt",
          }
        );
    }
  };

  const notifyError = (props) => {
    const { title, msg, toastCntId } = props;
    notify({ ...props, ...{ type: "error" } });
  };
  const notifySuccess = (props) => {
    const { title, msg, toastCntId } = props;
    notify({ ...props, ...{ type: "success" } });
  };

  return { notify, notifyError, notifySuccess };
}
