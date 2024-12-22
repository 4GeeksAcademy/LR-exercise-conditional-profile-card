import "../style/index.css";

// This function is called every time the user changes types or changes any input
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // Print the current variables to the console

  // Handle the cover image logic
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover === false) cover = "<div class='cover'></div>";

  // Handle dynamic name, role, city, and country
  let fullName = `${variables.name || "First Name"} ${variables.lastName ||
    "Last Name"}`;
  let role = variables.role || "Web Developer";
  let location = `${variables.city || "City"}, ${variables.country ||
    "Country"}`;

  // Handle social media links dynamically
  const socialMediaLinks = {
    twitter: variables.twitter
      ? `<li><a href="https://twitter.com/${variables.twitter}"><i class="fab fa-twitter"></i></a></li>`
      : "",
    github: variables.github
      ? `<li><a href="https://github.com/${variables.github}"><i class="fab fa-github"></i></a></li>`
      : "",
    linkedin: variables.linkedin
      ? `<li><a href="https://linkedin.com/in/${variables.linkedin}"><i class="fab fa-linkedin"></i></a></li>`
      : "",
    instagram: variables.instagram
      ? `<li><a href="https://instagram.com/${variables.instagram}"><i class="fab fa-instagram"></i></a></li>`
      : ""
  };

  // Join the social media links and set the position
  const socialMediaBar = `
    <ul class="position-${variables.socialMediaPosition || "left"}">
      ${socialMediaLinks.twitter}
      ${socialMediaLinks.github}
      ${socialMediaLinks.linkedin}
      ${socialMediaLinks.instagram}
    </ul>
  `;

  // Reset the website body with the new HTML output
  document.querySelector("#widget_content").innerHTML = `
    <div class="widget">
      ${cover}
      <img src="${variables.avatarURL ||
        "https://via.placeholder.com/150"}" class="photo" />
      <h1>${fullName}</h1>
      <h2>${role}</h2>
      <h3>${location}</h3>
      ${socialMediaBar}
    </div>
  `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "left",
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };

  render(window.variables); // Render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // Add a listener to every input
      const attribute = e.target.getAttribute("for"); // When any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // Render again the card with new values
    });
  });
};
