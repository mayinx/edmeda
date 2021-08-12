import { useForm } from "react-hook-form";
import "./NewCommunityModalPage.css";
import axios from "axios";
export default function NewCommunityModalPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("api/communities", data)
      .then((res) => {
        console.log(res);
        window.location = "/";
      })
      .catch((err) => {
        console.log("Couldn't create a new community - something went wrong");
        console.log(err);
        console.log(err.message);
      });
  };
  console.log("errors", errors);

  return (
    <div className="ModalPage__bodyInner NewCommunityModalPage">
      <form
        id="newCommunity"
        className="Form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="FormGroup">
          <label className="FormGroup__label" htmlFor="name">
            Class Community Name
          </label>
          <input
            className="FormGroup__ctrl"
            id="name"
            name="name"
            type="text"
            placeholder="e.g. 'Class 3a'"
            {...register("name", {
              required: true,
              max: 80,
              min: 3,
              maxLength: 80,
            })}
          />
        </div>

        <div className="FormGroup">
          <label className="FormGroup__label" htmlFor="grade">
            Class Grade
          </label>
          <select
            className="FormGroup__ctrl"
            id="grade"
            name="grade"
            {...register("grade", { required: true })}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
          </select>
        </div>

        <div className="FormGroup">
          <label className="FormGroup__label" htmlFor="creator">
            Teacher
          </label>
          <input
            className="FormGroup__ctrl"
            name="creator"
            id="creator"
            type="text"
            placeholder="teacher"
            {...register("creator", {
              required: true,
              max: 80,
              min: 3,
              maxLength: 80,
            })}
          />
        </div>
      </form>
    </div>
  );
}
