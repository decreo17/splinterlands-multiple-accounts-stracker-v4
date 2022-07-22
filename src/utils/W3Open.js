
var mySidebar
const W3Oopen = () => {
    
    // Get the Sidebar
    
    if (document.getElementById("my-sidebar")) {
      mySidebar = document.getElementById("my-sidebar");
    } else {
      mySidebar = ""
    }
    
    
    if (mySidebar.style.display === 'block') {
      mySidebar.style.display = 'none';
      //overlayBg.style.display = "none";
    } else {
      mySidebar.style.display = 'block';
      //overlayBg.style.display = "block";
    }
}

export default W3Oopen