class FormConfig {
  constructor() {
    this.valdiationMsgNameRequired =
      "You must specify a uniq name for your class community (between 3 and 60 characters long)";
    this.valdiationMsgGradeRequired = "You must specify a class grade";
    this.valdiationMsgCreatorRequired =
      "You must specify a class teacher as community owner (between 3 and 60 characters long)";

    this.name = {
      label: "Community Name",
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
          className: "default",
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
