const formSearch = document.querySelector("#form-search");
const roomListView = document.querySelector("#room-list-view");


formSearch.addEventListener("submit",async (evt)=>{
    evt.preventDefault();
    const searchQuery = evt.target["input-search-query"].value
    console.log(searchQuery);
    location.href = `search?search=${searchQuery}`;
});
