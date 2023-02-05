//Global variables
const numThemes = 6;

//Generating theme buttons

const themes = [
    ["Theme 1", "Theme 2", "Theme 3", "Theme 4", "Theme 5", "Theme 6"],
    [1, 2, 3, 4, 5, 6]
];

//test - access elements from array
console.log(themes[1][0]);

for (let i = 0; i < numThemes; i++) {
    const themeButton = document.createElement("button");
    const node = document.createTextNode(themes[0][i]);
    themeButton.appendChild(node);

    themeButton.value = themes[1][i];
    themeButton.id = themes[1][i];
    themeButton.className = "ThemeButton";

    const element = document.getElementById("themeBox");
    element.appendChild(themeButton);
}