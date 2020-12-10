$(".btn-primary").click(() => {
    let birthyear = prompt("Please enter your birth year");
    let ageInDays = (2020 - birthyear) * 365;
    if( ageInDays != null){
        $(".flex-box-result").html(`<h1>${ageInDays} Day's you have already lived</h1>`);
    }
})