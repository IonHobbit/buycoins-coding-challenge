import { User } from "./classes/user.js";

localStorage.clear()

function fetchUser() {
    let username = document.querySelector('#user-login-input').value;
    fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'bearer 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'
        },
        body: JSON.stringify({
            query:
                `query($user: String!) {
                    user(login: $user) {
                        avatarUrl,
                        bio,
                        login,
                        name,
                        status {
                            emoji,
                            emojiHTML,
                        },
                        repositories(first: 20) {
                            nodes {
                                name,
                                forkCount,
                                description,
                                languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
                                    nodes {
                                        name,
                                        color,
                                    }
                                },
                                stargazerCount,
                                updatedAt,
                                isPrivate
                            },
                            totalCount,
                        }
                    }
                }`,
            variables: {
                user: username
            }
        })
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.data.user) {
                let user = new User(result.data.user)
                localStorage.setItem('user', JSON.stringify(user))
                window.location.replace('repositories.html')
            } else {
                showMessage(`The user with the username '${username}' does not exist. Please try a different username.`)
            }
        })
}

document.querySelector('#form').addEventListener('submit', function (e) {
    let username = document.querySelector('#user-login-input').value;
    if (username.length == 0) {
        showMessage('Please provide a username.')
    } else {
        fetchUser()
    }
    e.preventDefault()
})

function showMessage(message) {
    setTimeout(() => {
        document.querySelector('.error-message-wrapper').innerHTML = ''
    }, 5000);
    document.querySelector('.error-message-wrapper').innerHTML = `        
        <div id="error-message" class="mx-auto">
            ${message}
        </div>
    `
}