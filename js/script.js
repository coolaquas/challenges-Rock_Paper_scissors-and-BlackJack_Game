$("document").ready(()=> {
    $(".flex-box-result").hide(); 
})
$(".btn-primary").click(() => {
    let birthyear = prompt("Please enter your birth year");
    let ageInDays = (2020 - birthyear) * 365;
        $(".flex-box-result").show().html(`<h1>hey!you have already lived ${ageInDays} Day's </h1>`);
})
$(".btn-danger").click(() => {
    $(".flex-box-result").hide();
})
var img_gen = ()=> {
    let image = document.createElement("img");
    let div = $(".flex-box-container-2");
    image.src = "https://source.unsplash.com/random/150x100";
    div.append(image);
};
$("#gen_btn").click(img_gen);

