export default function NewCommunityModalPage() {
  return (
    <div className="ModalPage">
      New Community form
      <form
        onSubmit={(e) => {
          console.log("FORM SUBMITTED");
        }}
      >
        <label>
          Community Name:
          {/* <textarea value={this.state.value} onChange={this.handleChange} /> */}
          <input type="text" />
        </label>
        <input type="submit" value="Absenden" />
      </form>
    </div>
  );
}
