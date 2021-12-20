class FormConfig {
  constructor() {
    this.shared = {
      valdiationMsgEmailRequired: "Please provide an Email-Address",
      valdiationMsgPasswordRequired: "Please provide a Password",
      valdiationMsgTypeRequired: "Please provide a valid User Type",
      valdiationMsgGenderRequired: "Please provide a gender",
      valdiationMsgFullNameRequired:
        "Please provide your full name (between 3 and 60 characters long)",
      valdiationMsgFirstNameRequired:
        "Please provide a first name (between 3 and 60 characters long)",
      valdiationMsgLastNameRequired:
        "Please provide a last name (between 3 and 60 characters long)",
    };
    this.new = {
      type: {
        label: "User Type",
        options: [
          {
            label: "-- Select User Type --",
            value: "",
            className: "default",
          },
          {
            label: "Student",
            value: "Student",
          },
          {
            label: "Teacher",
            value: "Teacher",
          },
          {
            label: "Parent",
            value: "Parent",
          },
        ],
        validationRuleset: {
          required: {
            value: true,
            message: this.shared.valdiationMsgTypeRequired,
          },
        },
      },

      email: {
        type: "email",
        label: "E-Mail-Address",
        placeholder: "E.g. 'jonny.mcguire@gmail.com'",
        validationRuleset: {
          required: {
            value: true,
            message: this.shared.valdiationMsgEmailRequired,
          },
          minLength: {
            value: 6,
            message: this.shared.valdiationMsgEmailRequired,
          },
          maxLength: {
            value: 60,
            message: this.shared.valdiationMsgEmailRequired,
          },
        },
      },
      fullName: {
        type: "text",
        label: "Full name",
        placeholder: "E.g. 'Jonny McGuire'",
        validationRuleset: {
          required: {
            value: true,
            message: this.shared.valdiationMsgFullNameRequired,
          },
          minLength: {
            value: 3,
            message: this.shared.valdiationMsgFullNameRequired,
          },
          maxLength: {
            value: 60,
            message: this.shared.valdiationMsgFullNameRequired,
          },
        },
      },
    };
    this.edit = {
      firstName: {
        type: "text",
        label: "First name",
        placeholder: "E.g. 'Jonny'",
        validationRuleset: {
          required: {
            value: true,
            message: this.shared.valdiationMsgFirstNameRequired,
          },
          minLength: {
            value: 3,
            message: this.shared.valdiationMsgFirstNameRequired,
          },
          maxLength: {
            value: 60,
            message: this.shared.valdiationMsgFirstNameRequired,
          },
        },
      },
      lastName: {
        type: "text",
        label: "Last name",
        placeholder: "E.g. 'McGuire'",
        validationRuleset: {
          required: {
            value: true,
            message: this.shared.valdiationMsgLastNameRequired,
          },
          minLength: {
            value: 3,
            message: this.shared.valdiationMsgLastNameRequired,
          },
          maxLength: {
            value: 60,
            message: this.shared.valdiationMsgLastNameRequired,
          },
        },
      },
      gender: {
        label: "Gender",
        options: [
          {
            label: "-- Select Gender --",
            value: "",
            className: "default",
          },
          {
            label: "Male",
            value: "male",
          },
          {
            label: "Female",
            value: "female",
          },
          {
            label: "Diverse",
            value: "diverse",
          },
        ],
        validationRuleset: {
          required: {
            value: true,
            message: this.shared.valdiationMsgGenderRequired,
          },
        },
      },
      email: {
        type: "email",
        label: "E-Mail-Address",
        placeholder: "E.g. 'jonny.mcguire@gmail.com'",
        validationRuleset: {
          required: {
            value: true,
            message: this.shared.valdiationMsgEmailRequired,
          },
          minLength: {
            value: 6,
            message: this.shared.valdiationMsgEmailRequired,
          },
          maxLength: {
            value: 60,
            message: this.shared.valdiationMsgEmailRequired,
          },
        },
      },
    };
    this.valdiationMsgFullNameRequired =
      "Please provide your full name (between 3 and 60 characters long)";
    this.valdiationMsgEmailRequired =
      "Please provide a valid Email-Address (between 6 and 60 characters long)";
    this.valdiationMsgPasswordRequired =
      "Please provide a valid Password (between 6 and 60 characters long, etc. ...)";
    this.valdiationMsgPasswordConfirmationRequired =
      "Please repeat your pasword to confirm it";

    this.email = {
      type: "email",
      label: "Your E-Mail-Adress",
      placeholder: "E.g. 'jonny.mcguire@gmail.com'",
      validationRuleset: {
        required: {
          value: true,
          message: this.valdiationMsgEmailRequired,
        },
        minLength: {
          value: 6,
          message: this.valdiationMsgEmailRequired,
        },
        maxLength: {
          value: 60,
          message: this.valdiationMsgEmailRequired,
        },
      },
    };

    this.password = {
      type: "password",
      label: "Your Password",
      placeholder: "NOT 'jonny123' ;-)",
      validationRuleset: {
        required: {
          value: true,
          message: this.valdiationMsgPasswordRequired,
        },
        minLength: {
          value: 6,
          message: this.valdiationMsgPasswordRequired,
        },
        maxLength: {
          value: 60,
          message: this.valdiationMsgPasswordRequired,
        },
      },
    };

    this.passwordConfirmation = {
      type: "password",
      label: "Password Confirmation",
      placeholder: "Repeat your password",
      validationRuleset: {
        required: {
          value: true,
          message: this.valdiationMsgPasswordConfirmationRequired,
        },
        minLength: {
          value: 6,
          message: this.valdiationMsgPasswordConfirmationRequired,
        },
        maxLength: {
          value: 60,
          message: this.valdiationMsgPasswordConfirmationRequired,
        },
      },
    };
  }
}

export default new FormConfig();
