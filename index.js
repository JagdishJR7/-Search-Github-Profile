const url = "https://api.github.com/users";
const searchInputE1 = document.getElementById("searchInput");
const searchButtonE1 = document.getElementById("searchBtn");
const profileContainerE1 = document.getElementById("profileContainer");
const loadingE1 = document.getElementById("loading");

const generateProfile = (profile) => {
    return `

     <div class = "profile-box">
     <div class = "top-section">
        <div class="left">
            <div class = "avatar">
                <img alt = "avatar" src = "${profile.avatar_url}"/>
            </div>
            <div class="self">
                <h1>${profile.name}</h1>
                <h1>${profile.login}</h1>
            </div>
            <a href="${profile.html_url}" target="_black">
            <button class="primary-btn">Check Profile</button>
            </a>
        </div>
        
        <div class="about">
           <h2>About</h2>
           <p>${profile.bio}</p>
        </div>
        
        <div class="status">
            <div class="status-item">
                <h3>Followers</h3>
                <p>${profile.followers}</p>
            </div>
            <div class="status-item">
                <h3>Following</h3>
                <p>${profile.following}</p>
            </div>
            <div class="status-item">
                <h3>Repos</h3>
                <p>${profile.public_repos}</p>
            </div>
        </div>
    </div>
        `;
};

const fetchProfile = async () => {
    const username = searchInputE1.value;

    loadingE1.innerText = "loading....";
    loadingE1.style.color = "black";

    try{
        const res = await fetch(`${url}/${username}`);
        const data = await res.json();
        if (data.bio){
            loadingE1.innerText = "";
            profileContainerE1.innerHTML = generateProfile(data);
        }
        else{
            loadingE1.innerHTML = data.message;
            loadingE1.style.color = "red";
            profileContainerE1.innerText = "";
        }  
        console.log("data",data);  
    } 
    catch (error){
        console.log({error});
        loadingE1.innerText = "";
    }
};

searchButtonE1.addEventListener("click",fetchProfile);
