const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
                                        </div>
                                        <div class="follow">
                                            <div class="followers">
                                                <h2>👥Seguidores</h2>
                                                <p>${user.followers}</p>
                                            </div>
                                            <div class="following">
                                                <h2>👥 Seguindo</h2>
                                                <p>${user.following}</p>
                                            </div>
                                        </div>
                                        <hr size="10" width="100%" align="center">
                                    </div>`


        let repositoriesItens = ""
        user.repositories.forEach(repo =>
            repositoriesItens += `<li>
                                        <a href="${repo.html_url}" target="_blank">${repo.name}</a><br><br>
                                        <span>🍴${repo.forks}</span>
                                        <span>⭐${repo.stargazers_count}</span>
                                        <span>👀${repo.watchers}</span>
                                        <span>👩‍💻${repo.language ?? "Sem linguagem"}</span>
                                </li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>
                                            <hr size="10" width="100%" align="center">`


        }
        
        document.querySelector('.profile-data').innerHTML += `
                                                            <div class="activityInfo">
                                                                <h2>Atividades</h2>
                                                            </div>`
        user.activities.forEach(repoName => {
            const nameRepo = repoName.repo.name

            if (repoName.payload) {
                if (repoName.payload.commits) {
                    repoName.payload.commits.forEach(msg => {
                        const commitMessage = msg.message

                        document.querySelector('.profile-data').innerHTML += `
                                                            <ul>
                                                                <li>
                                                                    <p><b>${nameRepo}</b>: ${commitMessage}</p>
                                                                </li>
                                                            </ul>`
                    })
                }
            }
        })
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }

