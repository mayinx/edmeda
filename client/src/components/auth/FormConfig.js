class FormConfig {
  constructor() {
    this.loginShared = {
      valdiationMsgEmailRequired: "Please provide your Email-Address",
      valdiationMsgPasswordRequired: "Please provide your Password",
    };
    this.login = {
      email: {
        type: "email",
        label: "Your E-Mail-Address",
        placeholder: "Demo: 'chuck@nerdherd.com'",
        validationRuleset: {
          required: {
            value: true,
            message: this.loginShared.valdiationMsgEmailRequired,
          },
          minLength: {
            value: 6,
            message: this.loginShared.valdiationMsgEmailRequired,
          },
          maxLength: {
            value: 60,
            message: this.loginShared.valdiationMsgEmailRequired,
          },
        },
      },

      password: {
        type: "password",
        label: "Your Password",
        placeholder: "Demo: 'Chuck99'",
        validationRuleset: {
          required: {
            value: true,
            message: this.loginShared.valdiationMsgPasswordRequired,
          },
          minLength: {
            value: 6,
            message: this.loginShared.valdiationMsgPasswordRequired,
          },
          maxLength: {
            value: 60,
            message: this.loginShared.valdiationMsgPasswordRequired,
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

    this.fullName = {
      type: "text",
      label: "Your full name",
      placeholder: "E.g. 'Jonny McGuire'",
      validationRuleset: {
        required: {
          value: true,
          message: this.valdiationMsgFullNameRequired,
        },
        minLength: {
          value: 3,
          message: this.valdiationMsgFullNameRequired,
        },
        maxLength: {
          value: 60,
          message: this.valdiationMsgFullNameRequired,
        },
      },
    };

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
