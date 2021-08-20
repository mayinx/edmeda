// TODO: Ask Namir / Martin: What's the best practice here to share domain-object-related literals and config data and whatnotbetween a group of ocmponents (I mean apart from contexts )? Is the following a 'valid solution'?:
class FormConfig {
  constructor() {
    // TODO: Discuss this simple use case here (as a blueprint for more complex stuff yet to come):
    // Shared options for the grade selects in the new and update forms ... - one could argue that it's business logic / domain model stuff and thus server side responsibility to know which range of grades are valid / allowed  - but it's certainly responsibility of the client to know how to render those - so what's the convention to handle cenarios like this? Where to keep sort of global stuff like this etc. ...?

    this.valdiationMsgNameRequired =
      "You must specify a uniq name for your class community (between 3 and 60 characters long)";
    this.valdiationMsgGradeRequired = "You must specify a class grade";
    this.valdiationMsgCreatorRequired =
      "You must specify a class teacher as community owner (between 3 and 60 characters long)";

    this.name = {
      label: "Class Community Name",
      placeholder: "E.g. 'Class Community 3a'",
      validationRuleset: {
        required: {
          value: true,
          message: this.valdiationMsgNameRequired,
        },
        minLength: {
          value: 3,
          message: this.valdiationMsgNameRequired,
        },
        maxLength: {
          value: 60,
          message: this.valdiationMsgNameRequired,
        },
      },
    };
    this.grade = {
      label: "Class Grade",
      options: [
        {
          label: "-- Select Class Grade --",
          value: "",
        },
        {
          label: "1",
          value: 1,
        },
        {
          label: "2",
          value: 2,
        },
        {
          label: "3",
          value: 3,
        },
        {
          label: "4",
          value: 4,
        },
        {
          label: "5",
          value: 5,
        },
        {
          label: "6",
          value: 6,
        },
        {
          label: "7",
          value: 7,
        },
        {
          label: "8",
          value: 8,
        },
        {
          label: "9",
          value: 9,
        },
        {
          label: "10",
          value: 10,
        },
        {
          label: "11",
          value: 11,
        },
        {
          label: "12",
          value: 12,
        },
        {
          label: "13",
          value: 13,
        },
      ],
      validationRuleset: {
        required: {
          value: true,
          message: this.valdiationMsgGradeRequired,
        },
      },
    };
    this.creator = {
      label: "Teacher (Community Owner)",
      placeholder: "Teacher / Community Owner",
      validationRuleset: {
        required: {
          value: true,
          message: this.valdiationMsgCreatorRequired,
        },
        minLength: {
          value: 3,
          message: this.valdiationMsgCreatorRequired,
        },
        maxLength: {
          value: 60,
          message: this.valdiationMsgCreatorRequired,
        },
      },
    };
  }
}

export default new FormConfig();
