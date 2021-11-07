// Global constants + their accessors
// Include this in index.js to make those globally available, e.g.:
//    import './constants/global';
// F.i: To access a user type speific tag color:
//    global.config.user.typeTagColors.Student; //=> "green"
// Or use an accessor if available, whch will produce an default value
//    global.config.user.typeTagColorFor("Honk"); //=> "blue"
module.exports = global.config = {
  user: {
    typeTagColors: {
      Student: "green",
      Teacher: "dark-blue",
      Parent: "blue",
    },
    typeTagColorFor: (userType) => {
      return global.config.user.typeTagColors[userType] || "blue";
    },
  },
  community: {
    typeTagColors: {
      Tenant: "dark-blue",
      School: "dark-blue",
      Class: "blue",
      Course: "green",
      Custom: "yellow",
    },
    typeTagColorFor: (communityType) => {
      return global.config.community.typeTagColors[communityType] || "blue";
    },
    typeTagCaptions: {
      Tenant: "School",
      School: "School",
      Class: "Class",
      Course: "Course",
      Custom: "Custom",
    },
    typeTagCaptionFor: (communityType) => {
      return (
        global.config.community.typeTagCaptions[communityType] || communityType
      );
    },
  },
};
