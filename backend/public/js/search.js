const formSearch = document.querySelector("#form-search");
const roomListView = document.querySelector("#room-list-view");
const listSearchRoot = document.querySelector("#list-search-root");
const searchLength = document.querySelector("#search-status");

formSearch.addEventListener("submit",async (evt)=>{
    evt.preventDefault();
    const searchQuery = evt.target["input-search-query"].value
    console.log(searchQuery);
    location.href = `search?search=${searchQuery}`;
    searchLength.textContent = "검색 결과";

});

console.log(roomListView);
for (let i = 0; i < listSearchRoot.childElementCount; i++) {
    console.log(listSearchRoot.children[i])
    console.log(listSearchRoot.children[i].children[0].textContent)
    listSearchRoot.children[i].children[3].addEventListener("click",async ()=>{
        const roomId = listSearchRoot.children[i].children[0].textContent;
        const result = await axios.get("/room/"+roomId);
        if(result.data.status===400){
            alert("방이 꽉찼습니다. 다른방을 이용해주세요 >:)");
        }else{
            location.href = "/room/"+roomId;
        }
    });

}