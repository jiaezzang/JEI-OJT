const paintBtn = document.querySelector("#paintBtn");
const scratchPad = document.querySelector("#scratchPad");

paintBtn.onclick = () => {
    if(scratchPad.style.display === "none"){
        scratchPad.style.display = "";
    }else if (scratchPad.style.display === ""){
        scratchPad.style.display = "none";
    }
    
}