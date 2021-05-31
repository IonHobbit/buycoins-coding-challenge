import { User } from './classes/user.js'

var localUser = localStorage.getItem('user')

var avatars = document.querySelectorAll('.avatar')
var userName = document.querySelector('#user-fullname')
var userLogins = document.querySelectorAll('.user-login')
var userStatuses = document.querySelectorAll('.status')
var userBio = document.querySelector('#bio')
var repositoryCounts = document.querySelectorAll('.count')
var activeRepositoryCount = document.querySelector('#active-repository-count')

function load() {
    if (localUser) {
        var user = new User(JSON.parse(localUser));
        updateTitle(user)
        updateUser(user)
        loadRepos(user)
    } else {
        window.location.replace('/')
    }
}

function updateTitle(user) {
    document.title = `${user.login} ${user.name ? `(${user.name})` : ''}  / Repositories`;
}

function updateUser(user) {
    for (let avatar of avatars) {
        avatar.src = user.avatarUrl
    }
    userName.innerHTML = user.name;
    for (let userLogin of userLogins) {
        userLogin.innerHTML = user.login;
    }
    for (let status of userStatuses) {
        status.innerHTML = user.status;
    }
    for (let repositoryCount of repositoryCounts) {
        repositoryCount.innerHTML = user.repositories.totalCount
    }

    if (user.repositories.totalCount <= 0) {
        for (let repositoryCount of repositoryCounts) {
            repositoryCount.remove()
        }
    }

    JSON.parse(localUser).status.split('"').includes('icon default-icon-null') ? document.querySelector('#profile-container').removeChild(userStatuses[1]) : '';
    userBio.innerHTML = user.bio
    activeRepositoryCount.innerHTML = user.repositories.nodes.length
}

function loadRepos(user) {
    const repositories = document.getElementById('repositories')
    let repositoriesHTML = ''
    user.repositories.nodes.forEach(repo => {
        const repository = `
            <div class="repository border-bottom py-4">
                <div class="details">
                    <a href='https://github.com/${user.login}/${repo.name}' class="repository-name">${repo.name}</a>
                    <p class="repository-description">${repo.description || ''}</p>
                    <div class="statistics flex">
                        ${repo.languages.nodes[0] ?
                `<span class="language flex align-center mr-3">
                    <span class="language-color mr-1" style="background-color: ${repo.languages.nodes[0].color || ''}"></span> 
                    ${repo.languages.nodes[0].name || ''}
                </span>`
                : ''}
                        ${repo.stargazerCount > 0 ?
                `<a href='https://github.com/${user.login}/${repo.name}/stargazers' class="mr-3 clickable pointer">
                    <svg aria-label="star" role="img" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class="icon">
                        <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                    </svg>
                    ${repo.stargazerCount}
                </a>`
                : ''}
                        ${repo.forkCount > 0 ?
                `<a href='https://github.com/${user.login}/${repo.name}/network/members' class="mr-3 clickable pointer">
                    <svg aria-label="fork" role="img" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class="icon">
                        <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                    </svg>
                    ${repo.forkCount}
                </a>`
                : ''}
                        <span class="mr-3">Updated on ${repo.updatedAt}</span>
                    </div>
                </div>
                <div class="action">
                    <button class="button flex"> <svg class="icon mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg> Star</button>
                </div>
            </div>
        `
        repositoriesHTML += repository
    });
    repositories.innerHTML = repositoriesHTML
}

function goHome() {
    window.location.replace('/')
}

function toggleMiniProfile() {
    if (window.scrollY >= 318) {
        document.querySelector(".user-profile").classList.remove('invisible')
        document.querySelector(".user-profile").classList.add('visible')
    } else {
        document.querySelector(".user-profile").classList.add('invisible')
        document.querySelector(".user-profile").classList.remove('visible')

    }
}

document.querySelector('#logo').addEventListener('click', function () { goHome() })
document.querySelector('#menu').addEventListener('click', function () { goHome() })

document.addEventListener('scroll', function () { toggleMiniProfile() })

load()